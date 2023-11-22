import React, { FC, useEffect } from 'react'
import Image from 'next/image'
import { Typewriter } from 'react-simple-typewriter'

type Props = {}

const Hero: FC<Props> = (props) => {

    return (
        <section className='h-[90vh] font-poppins'>
            <div className='grid lg:grid-cols-3 sm:grid-cols-1 dark:text-white'>
                <div className='p-10 lg:p-28 md:p-20 w-full col-span-2'>
                    <p className='dark:text-[#37a39a] text-[crimson]'>Learn more with Elearning</p>

                    <h1 className='text-5xl font-extrabold py-5'>Empower your employees to upskill with {" "}
                        <span className="text-[crimson]"><Typewriter
                            words={['Java', 'Python', 'Javascript']}
                            loop={true}
                            cursor
                            cursorStyle='_'
                            typeSpeed={200}
                            deleteSpeed={200}
                            delaySpeed={2000}                           
                        /></span>
                    </h1>
                    <p>A learning system based on formalised teaching but with the help of electronic resources is known as E-learning. </p>
                    <div className='my-10 grid grid-cols-2'>
                        <div className="hero-button-wrapper">
                            <button className="hero-button dark:bg-black bg-transparent" type="button">Explore</button>
                            <div className="hero-button-bg"></div>
                        </div>
                    </div>
                </div>
                <div className='lg:block hidden'>
                    <Image src={require("../../assets/img/hero-banner.png")} alt='Hero Banner' className='py-20 -ml-28' draggable={false} />
                </div>
            </div>
        </section>
    )
}

export default Hero