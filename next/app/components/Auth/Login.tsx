import React, { FC, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from 'react-icons/fc'
import { style } from '../../styles/style'
import { useLoginMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

type Props = {
    setRoute: (route: string) => void;
    setOpen: (open: Boolean) => void;
}

const Schema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
})

const Login: FC<Props> = ({ setRoute, setOpen }) => {
    const [show, setShow] = useState(false);
    const [login, { isSuccess, error }] = useLoginMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Login Successfully");
            setOpen(false);
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
            }
        }
    }, [isSuccess, error]);


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Schema,
        onSubmit: async (values) => {
            await login(values);
        },
    });

    const { errors, touched, values, handleChange, handleSubmit } = formik;

    return (
        <div className='w-full px-10'>
            <h1 className={`${style.title}`}>
                Login With <span className='text-[crimson]'>Elearning</span>
            </h1>
            <form onSubmit={handleSubmit}>
                <label
                    className={`${style.label}`}>
                    Enter your email
                </label>
                <input
                    type="email"
                    name="email"
                    id='email'
                    value={values.email}
                    placeholder='example@email.com'
                    className={`${errors.email && touched.email && "border-red-500"}   ${style.input}`}
                    onChange={handleChange}
                />
                {errors.email && touched.email && (
                    <span className="text-red-500 pt-1 block text-sm">{errors.email}</span>
                )}

                <div className='w-full mt-2 relative mb-1'>
                    <label
                        className={`${style.label}`}>
                        Enter your password
                    </label>
                    <input
                        type={!show ? 'password' : 'text'}
                        name="password"
                        id='password'
                        value={values.password}
                        className={`${errors.password && touched.password && "border-red-500"}   ${style.input}`}
                        onChange={handleChange}
                        placeholder='********'
                    />
                    {
                        !show ? (
                            <AiOutlineEyeInvisible
                                size={25}
                                className="absolute bottom-2 right-2 z-1 cursor-pointer dark:text-white"
                                onClick={() => setShow(true)}
                            />
                        ) : <AiOutlineEye
                            size={25}
                            className="absolute bottom-2 right-2 z-1 cursor-pointer dark:text-white"
                            onClick={() => setShow(false)}
                        />
                    }

                    {errors.password && touched.password && (
                        <span className="text-red-500 pt-1 block text-sm">{errors.password}</span>
                    )}
                </div>
                <div>
                    <button
                        type="submit"
                        className={`${style.button}`}
                    >
                        Login
                    </button>
                </div>
                <p className="text-center font-bold dark:text-white">OR Join with</p>
                <div className='flex rounded  my-3'>
                    <p className='m-auto flex'><FcGoogle size="30" className="cursor-pointer ml-2" 
                    onClick={()=>signIn("google")}
                    
                    /></p>
                </div>

                <div className='text-center mb-2 dark:text-white'>
                    <h5>Not have any account ? {" "}<span className='text-blue-600 font-bold cursor-pointer pl-1'
                        onClick={() => setRoute("SignUp")}
                    >Sign Up</span></h5>
                </div>
            </form>
        </div>
    )
}

export default Login