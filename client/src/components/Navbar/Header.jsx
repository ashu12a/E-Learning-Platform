import React, { useEffect, useState } from 'react'
import { FaSun, FaUserCircle } from 'react-icons/fa';
import { BsFillMoonFill } from 'react-icons/bs';
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx';
import LoginForm from '../../utils/LoginForm';
// import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';


export default function Header() {
    const [theme, setTheme] = useState('light');
    const [showMobileMenu, setshowMobileMenu] = useState(false);
    const [loginPop, setLoginPop] = useState(false);

    const scrollToCourseSection = () => {
        const courseSection = document.getElementById('CourseSection');
        if (courseSection) {
            courseSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToAboutSection = () => {
        const courseSection = document.getElementById('AboutSection');
        if (courseSection) {
            courseSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const scrollToContactSection = () => {
        const courseSection = document.getElementById('ContactSection');
        if (courseSection) {
            courseSection.scrollIntoView({ behavior: 'smooth' });
        }
    };




    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme])

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    return (
        <>
            <section id='HeaderSection' className='border-b border-gray-500 py-3 dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black dark:text-white transition duration-300'>
                <div className='h-10  px-10 flex'>
                    <div className='mr-auto'>
                        <h1 className='text-4xl font-extrabold'>
                            <span className='text-[crimson]'>E</span>LMS
                        </h1>
                    </div>
                    <div className='m-auto max-[800px]:hidden block '>
                        <ul className='flex font-[500] text-xl'>
                            <li className='mx-10 hover:text-green-600 cursor-pointer'>Home</li>
                            <li onClick={scrollToCourseSection} className='mx-10 hover:text-green-600 cursor-pointer'>Courses</li>
                            <li onClick={scrollToAboutSection} className='mx-10 hover:text-green-600 cursor-pointer'>About</li>
                            <li onClick={scrollToContactSection} className='mx-10 hover:text-green-600 cursor-pointer'>Contact</li>
                        </ul>
                    </div>
                    <div className='ml-auto flex'>
                        <button onClick={() => toggleTheme()} className='py-2'>
                            {theme !== 'light' ? <FaSun size={24} /> : <BsFillMoonFill size={24} />}
                        </button>
                        <button className='ml-3'>
                            <FaUserCircle size={24} onClick={() => setLoginPop(true)} />
                        </button>
                        <button className='ml-3 max-[800px]:block hidden'>
                            {!showMobileMenu && <RxHamburgerMenu size={24} onClick={() => {
                                setshowMobileMenu(true)
                            }} />}
                            {showMobileMenu && <RxCross2 size={24} className='text-green-600' onClick={() => {
                                setshowMobileMenu(false)
                            }} />}
                        </button>
                    </div>
                </div>
            </section>
            {/* // mobile menu */}
            <nav className={`mobile-menu w-full max-[800px]:block hidden overflow-hidden dark:bg-gradient-to-b dark:from-gray-900 dark:to-black dark:text-white transition duration-300 ${showMobileMenu ? 'open' : ''}`} id='mobilemenu'>
                <ul className='font-[500] text-xl pb-5'>
                    <li className='mx-10 py-2 hover:text-green-600 cursor-pointer'>Home</li>
                    <li onClick={scrollToCourseSection} className='mx-10 py-2 hover:text-green-600 cursor-pointer'>Courses</li>
                    <li onClick={scrollToAboutSection} className='mx-10 py-2 hover:text-green-600 cursor-pointer'>About</li>
                    <li onClick={scrollToContactSection} className='mx-10 py-2 hover:text-green-600 cursor-pointer'>Contact</li>
                </ul>
            </nav>
            {/* Login Popup */}
            <LoginForm open={loginPop} handleClose={() => setLoginPop(false)}  />
        </>
    )
}
