import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react'
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher"
import { HiOutlineMenu, HiOutlineUserCircle } from "react-icons/hi";
import CustomModel from '../utils/CustomModel';
import Login from '../components/Auth/Login'
import SignUp from './Auth/SignUp';
import Verification from './Auth/Verification';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import avatar from '../assets/img/avatar.png';
import {useSession} from 'next-auth/react';
import { useSocialAuthMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';


type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: number;
    route: string;
    setRoute: (route: string) => void;
}

const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
    const [active, setActive] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);
    const {user} = useSelector((state:any)=> state.auth);
    const {data} = useSession();
    const [socialAuth,{isSuccess,error}] = useSocialAuthMutation();

    useEffect(() => {
        if(!user){
            if(data){
                socialAuth({
                    email:data?.user?.email,
                    name:data?.user?.name,
                    avatar:data?.user?.image
                });
            }
        }
        if (isSuccess) {
            toast.success("Login Successfully");
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
            }
        }
    }, [isSuccess,error]);


    

    if (typeof window !== "undefined") {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 80) {
                setActive(true);
            } else {
                setActive(false);
            }
        })
    }

    const handleClose = (e: any) => {
        if (e.target.id === "screen") {
            setOpenSidebar(false);
        }
    }

    return (
        <div className='w-full relative'>
            <div className={`${active ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0  w-full h-[60px] z-[80] border-b dark:border-[#fffff1c] shadow-xl transition duration-500 " : "w-full border-b dark:border-[#fffff1c] z-[80] dark:shadow"}`}>
                <div className="w-[95%] 800px:w-[92%] m-auto h-full">
                    <div className="w-full h-[60px] flex items-center justify-between px-3">
                        <div>
                            <Link href={"/"}
                                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
                            >
                                ELearning
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <NavItems
                                activeItem={activeItem}
                                isMobile={false}
                            />
                            <ThemeSwitcher />
                            {/* Only for Mobile  */}
                            <div className='800px:hidden'>
                                <HiOutlineMenu
                                    size={25}
                                    className="cursor-pointer dark:text-white text-black"
                                    onClick={() => setOpenSidebar(true)}
                                />
                            </div>

                            { user ?
                           ( <><Link href={"/profile"}>
                            <Image src={user.avatar ? user.avatar : avatar} alt='profile' className='w-[30px] h-[30px] rounded-full'/></Link>                  
                           
                            </>   )
                            : (<HiOutlineUserCircle
                                size={25}
                                className="hidden 800px:block cursor-pointer dark:text-white text-black"
                                onClick={() => setOpen(true)}
                            />)
                        }

                            
                        </div>
                    </div>
                </div>

                {
                    openSidebar && (
                        <div className="w-[95%] 800px:w-[92%] 800px:hidden block m-auto py-2 h-full"
                            onClick={handleClose}
                            id='screen'
                        >
                            <div className='w-[70%] fixed z-[9999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0'>
                                <NavItems activeItem={activeItem} isMobile={true} />
                                <HiOutlineUserCircle
                                    size={25}
                                    className="cursor-pointer ml-5 my-2 text-black dark:text-white"
                                    onCLick={() => setOpen(true)}
                                /><br /><br />
                                <p>
                                    Copyright @ 2023 ELearning
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
            {route === "Login" && (
                <>
                    {
                        open && (
                            <CustomModel
                                open={open}
                                setOpen={setOpen}
                                setRoute={setRoute}
                                activeItem={activeItem}
                                component={Login}

                            />

                        )
                    }
                </>
            )}
            {route === "SignUp" && (
                <>
                    {
                        open && (
                            <CustomModel
                                open={open}
                                setOpen={setOpen}
                                setRoute={setRoute}
                                activeItem={activeItem}
                                component={SignUp}

                            />

                        )
                    }
                </>
            )}
            {route === "Verification" && (
                <>
                    {
                        open && (
                            <CustomModel
                                open={open}
                                setOpen={setOpen}
                                setRoute={setRoute}
                                activeItem={activeItem}
                                component={Verification}

                            />

                        )
                    }
                </>
            )}
        </div>

    )
}

export default Header