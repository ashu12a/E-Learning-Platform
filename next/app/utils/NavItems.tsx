import Link from 'next/link';
import React from 'react'

export const navItemData = [
    {
        name: "Home",
        url: "/"
    },
    {
        name: "Courses",
        url: "/courses"
    },
    {
        name: "About",
        url: "/about"
    },
    {
        name: "Policy",
        url: "/policy"
    },
    {
        name: "FAQ",
        url: "/faq"
    },

]

type Props = {
    activeItem: number;
    isMobile: boolean;
}

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
    return (
        <>
            <div className="hidden 800px:flex">
                {
                    navItemData && navItemData.map((item, index) => {
                        return (
                            <Link href={item.url} key={index}>
                                <span className={`${activeItem === index
                                        ? "dark:text-[#37a39a] text-[crimson]"
                                        : "dark:text-white text-black"
                                    } text-[18px] px-6 font-Poppins font-[400]`}>
                                    {item.name}
                                </span>
                            </Link>
                        )
                    })
                }
            </div>
            {
                isMobile && (
                    <div className="mt-5 800px:hidden">
                        <div className='w-full text-center py-6'>
                            <Link href={"/"} passHref>
                                <span className="text-[25px] text-black dark:text-white text-[18px] font-Poppins font-[500]">
                                    ELearning
                                </span>
                            </Link>
                        </div>
                        {
                            navItemData && navItemData.map((item, index) => {
                                return (
                                    <Link href={item.url} passHref key={index}>
                                        <span className={`${activeItem === index
                                                ? "dark:text-[#37a39a] text-[crimson]"
                                                : "dark:text-white text-black"
                                            } block py-6 text-[18px] px-6 font-Poppins font-[400]`}>
                                            {item.name}
                                        </span>
                                    </Link>
                                )
                            })
                        }

                    </div>
                )
            }
        </>
    )
}

export default NavItems;