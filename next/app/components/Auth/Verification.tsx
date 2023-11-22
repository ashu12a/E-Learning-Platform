import React, { FC, useState, useRef, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { VscWorkspaceTrusted } from 'react-icons/vsc';
import { style } from '../../styles/style';
import { useSelector } from 'react-redux';
import { useActivationMutation } from '@/redux/features/auth/authApi';

type Props = {
    setRoute: (route: string) => void;
}
type VerifyNumber = {
    "0": string;
    "1": string;
    "2": string;
    "3": string;
}

const Verification: FC<Props> = ({ setRoute }) => {
    const {token} = useSelector((state:any)=> state.auth);
    const [activation,{isSuccess,error}] = useActivationMutation();
    const [invalidError, setInvalidError] = useState<boolean>(false);

    useEffect(() => {
        if (isSuccess) {
            toast.success("Account activated successfully");
            setRoute('Login');
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
            } else{
                console.log('An error occured:',error);
            }
        }
    }, [isSuccess, error]);

    const inputRef = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
        "0": "",
        "1": "",
        "2": "",
        "3": "",
    });

    const verificationHandler = async () => {
       const verificationNumber = Object.values(verifyNumber).join("");
       if(verificationNumber.length !== 4){
        setInvalidError(true);
        return;
       }
       await activation({
        activation_token: token,
        activation_code: verificationNumber
       })
    }

    const handleInputChange = (index: number, value: string) => {
        setInvalidError(false);
        const newVerifyNumber = { ...verifyNumber, [index]: value };
        setVerifyNumber(newVerifyNumber);

        if (value === "" && index > 0) {
            inputRef[index - 1].current?.focus();
        } else if (value.length === 1 && index < 3) {
            inputRef[index + 1].current?.focus();
        }
    }

    return (
        <div>
            <h1 className={style.title}>
                Verify your account
            </h1>
            <div className='w-full flex items-center justify-center mt-2'>
                <div className="w-[80px] h-[80px] rounded-full bg-[#497DF2] flex items-center justify-center">
                    <VscWorkspaceTrusted size={40} />
                </div>
            </div>
            <br />
            <br />
            <div className=' m-auto flex items-center justify-around'>
                {Object.keys(verifyNumber).map((key,index)=>(
                    <input type='number'
                    key={key}
                    ref={inputRef[index]}
                    className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-poppins outline-none text-center ${
                        invalidError ? "shake border-red-500" : "dark:border-white border-[#0000004a]"
                    }`}
                    placeholder=''
                    maxLength={1}
                    value={verifyNumber[key as keyof VerifyNumber]}
                    onChange={(e)=>handleInputChange(index,e.target.value)}
                    />
                ))}
            </div>
            <div className='w-full flex justify-center'>
                <button className={`${style.button} mx-20`} onClick={verificationHandler}>
                    Verify OTP
                </button>
            </div>
      
            <h5 className='text-center mb-5 font-Poppins text-[14px] text-black dark:text-white'> Go back to Sign in ? 
            <span
             className='text-blue-600 font-bold cursor-pointer pl-1'
             onClick={()=>setRoute("Login")}
            > Sign in</span>
            </h5>

        </div>
    )
}

export default Verification