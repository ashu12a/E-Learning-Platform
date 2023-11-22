import React from 'react'
import { Typewriter } from 'react-simple-typewriter'
import heroImage from "../../assets/img/heroImage.png";
import { BsMouse } from 'react-icons/bs'
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function Home() {
    const scrollToCourseSection = () => {
        const courseSection = document.getElementById('CourseSection');
        if (courseSection) {
            courseSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (

        <section id="container" className='dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black dark:text-white'>
            {/* ---------Hero Section--------- */}
            <section className='max-w-screen min-h-[90vh] max-w-screen'>
                <div className='grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 lg:px-10 md:mx-5 px-2 '>
                    <div className='px-15 pt-28 max-[800px]:pt-10 max-[800px]:p-0 col-span-2 '>
                        <p className='dark:text-green-500 text-[crimson] text-xl max-[800px]:mt-5'>Learn more with elearning</p>
                        <h1 className='text-6xl font-bold leading-[1.1] max-[800px]:text-5xl max-w-[90vw]'>Empower your employees to upskills
                            <p className='text-[crimson] px-2 inline max-[800px]:block'><Typewriter
                                words={['Java', 'Python', 'Javascript']}
                                loop={true}
                                cursor
                                cursorStyle='_'
                                typeSpeed={200}
                                deleteSpeed={200}
                                delaySpeed={2000}
                            /></p></h1>
                        <p className='mt-2 mr-5'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem omnis corrupti sit, qui laboriosam aliquam dolore.</p>
                        <div className='mt-10 ml-10'>
                            <button className='gradient-border dark:text-white dark:border dark:border-green-500 text-white px-10 py-2 hover:scale-[1.1] transition duration-600' onClick={scrollToCourseSection} >Explore More</button>
                        </div>
                    </div>
                    <div className=' w-[450px] -ml-20 max-[800px]:hidden'>
                        <img src={heroImage} alt="HeroImage" className=' mt-10' />
                    </div>
                </div>
                <div className='w-[100px] m-auto  text-[green] max-[800px]:mt-20 max-[800px]:text-center'>
                    <button onClick={scrollToCourseSection}>
                        <BsMouse size={40} className='cursor-pointer animate-bounce' />
                    </button>
                </div>
            </section>
            {/* ---------Course Section ------ */}
            <section id='CourseSection' className='bg-gray-200 dark:bg-transparent py-10'>
                <div>
                    <h1 className='text-center text-5xl font-bold max-[800px]:text-4xl'><span className='text-[crimson]'>Popular</span> Courses</h1>
                    <p className='text-center py-2 dark:text-white max-[800px]:text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi, ad.</p>
                </div>
                <div className='w-full mt-10 px-10 max-[800px]:px-5 items-center'>
                    <OwlCarousel className='owl-carousel' loop={true} autoplay={true} dots={true} responsive={{
                        0: {
                            items: 1,
                        },
                        800: {
                            items: 3,
                        },
                        1200: {
                            items: 4,
                        }
                    }}>
                        <div className='border-2 border-green-500 rounded bg-gray-200 dark:bg-transparent w-[300px]  h-[350px] hover:shadow-3xl cursor-pointer'>
                            <img src="https://source.unsplash.com/random/1920x1080/?study,landscape" alt="HeroImage" className='w-[100%] h-[200px]' />
                            <h2 className="text-xl font-bold py-1 px-2">The Best Python course for beginners who will learn ...</h2>
                            <p className='text-xs px-2'>Dr. Kalam</p>
                            <p className='text-md px-2'>4.7 ⭐⭐⭐⭐⭐ (1000)</p>
                            <p className='text-3xl px-2'>₹599 {" "} <strike className="text-gray-600 text-xl">₹1999</strike></p>
                        </div>
                        <div className='border-2 border-green-500 rounded  bg-gray-200 dark:bg-transparent w-[300px]  h-[350px] hover:shadow-3xl cursor-pointer'>
                            <img src="https://source.unsplash.com/random/1920x1080/?wallpaper,landscape" alt="HeroImage" className='w-[100%] h-[200px]' />
                            <h2 className="text-xl font-bold py-1 px-2">The Best Python course for beginners who will learn ...</h2>
                            <p className='text-xs px-2'>Dr. Kalam</p>
                            <p className='text-md px-2'>4.7 ⭐⭐⭐⭐⭐ (1000)</p>
                            <p className='text-3xl px-2'>₹599 {" "} <strike className="text-gray-600 text-xl">₹1999</strike></p>
                        </div>
                        <div className='border-2 border-green-500 rounded  bg-gray-200 dark:bg-transparent w-[300px]  h-[350px] hover:shadow-3xl cursor-pointer'>
                            <img src="https://source.unsplash.com/random/1920x1080/?learn,landscape" alt="HeroImage" className='w-[100%] h-[200px]' />
                            <h2 className="text-xl font-bold py-1 px-2">The Best Python course for beginners who will learn ...</h2>
                            <p className='text-xs px-2'>Dr. Kalam</p>
                            <p className='text-md px-2'>4.7 ⭐⭐⭐⭐⭐ (1000)</p>
                            <p className='text-3xl px-2'>₹599 {" "} <strike className="text-gray-600 text-xl">₹1999</strike></p>
                        </div>
                        <div className='border-2 border-green-500 rounded  bg-gray-200 dark:bg-transparent w-[300px]  h-[350px] hover:shadow-3xl cursor-pointer'>
                            <img src="https://source.unsplash.com/random/1920x1080/?learn,landscape" alt="HeroImage" className='w-[100%] h-[200px]' />
                            <h2 className="text-xl font-bold py-1 px-2">The Best Python course for beginners who will learn ...</h2>
                            <p className='text-xs px-2'>Dr. Kalam</p>
                            <p className='text-md px-2'>4.7 ⭐⭐⭐⭐⭐ (1000)</p>
                            <p className='text-3xl px-2'>₹599 {" "} <strike className="text-gray-600 text-xl">₹1999</strike></p>
                        </div>
                        <div className='border-2 border-green-500 rounded  bg-gray-200 dark:bg-transparent w-[300px]  h-[350px] hover:shadow-3xl cursor-pointer'>
                            <img src="https://source.unsplash.com/random/1920x1080/?learn,landscape" alt="HeroImage" className='w-[100%] h-[200px]' />
                            <h2 className="text-xl font-bold py-1 px-2">The Best Python course for beginners who will learn ...</h2>
                            <p className='text-xs px-2'>Dr. Kalam</p>
                            <p className='text-md px-2'>4.7 ⭐⭐⭐⭐⭐ (1000)</p>
                            <p className='text-3xl px-2'>₹599 {" "} <strike className="text-gray-600 text-xl">₹1999</strike></p>
                        </div>
                    </OwlCarousel>
                    <div className=' mt-10 m-auto ExploreCourseButtonContainer max-w-[250px]'>
                        <div className='btn'><a href='/'>Explore Courses</a></div>
                    </div>
                </div>
            </section>
            {/* --------------Circle ----------- */}
            <div className='rotateCircle1Container max-[800px]:hidden'>
                <div className='rotateCircle1'>
                    <div className='dot'></div>
                    <div className='dot'></div>
                    <div className='dot'></div>
                    <div className='dot'></div>
                </div>
            </div>
            {/* -----------About US Section -------------- */}
            <section className='py-10 ' id='AboutSection'>
                <div className='lg:mb-10 mb-0'>
                    <h1 className='text-center text-5xl font-bold dark:text-[crimson] max-[800px]:text-4xl'><span className='text-white max-[800px]:text-[crimson]'>Our</span> Academy</h1>
                </div>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 py-10'>
                    <div className='lg:col-span-2 lg:px-10 px-5 lg:py-5 py-1'>
                        <div>
                            <h1 className='text-4xl font-bold max-[800px]:text-3xl'>ELearning is the best institute for learning Database, Data structures and Development</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam deleniti accusamus eligendi hic laborum? Ipsum ipsa soluta autem deleniti minima.</p>
                        </div>
                        {/* ---------Testimonial ------------- */}
                        <div className='w-full  mb-5 max-w-[90vw] border border-green-500 mt-4 px-5 py-2 shadow-2xl'>
                            <OwlCarousel className='owl-carousel' loop={true} autoplay={true} items={1} dots={true} nav={false}>
                                <div className='text-center'>
                                    <div>
                                        <img src="https://source.unsplash.com/random/200x200/?girl,student" alt="TesttimonialProfile" className='w-[100px!important]  rounded-full m-auto' />
                                    </div>
                                    <h2 className='text-2xl'>Riya Khan (4.8 ⭐)</h2>
                                    <div className='flex'>
                                        <p><span className='mt0 inline' ><ImQuotesLeft size="30" className='inline' fill="#EFB400" /></span>{"  "}Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet odit iusto maxime dignissimos? Modi, eum eos ex accusamus blanditiis explicabo! <ImQuotesRight size="30" className='inline' fill="#EFB400" /></p>
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <div>
                                        <img src="https://source.unsplash.com/random/200x200/?girl" alt="TesttimonialProfile" className='w-[100px!important]  rounded-full m-auto' />
                                    </div>
                                    <h2 className='text-2xl'>Priya (4.8 ⭐)</h2>
                                    <div className='flex'>
                                        <p><span className='mt0 inline' ><ImQuotesLeft size="30" className='inline' fill="#EFB400" /></span>{"  "}Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet odit iusto maxime dignissimos? Modi, eum eos ex accusamus blanditiis explicabo! <ImQuotesRight size="30" className='inline' fill="#EFB400" /></p>
                                    </div>
                                </div>
                            </OwlCarousel>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src="https://source.unsplash.com/random/400x400/?professional" alt="AboutUs" className='px-5 w-[400px] h-[400px] rounded' />
                        </div>
                    </div>
                </div>
            </section>
            {/* ------------Contact Section ---------------- */}
            <section className='bg-gray-200 dark:bg-transparent' id="ContactSection">
                <div className='grid grid-cols-2'>
                    <div className='p-10'>
                        <div>
                            <h2 className='text-5xl text-center font-bold'><span className='text-[crimson]'>Get</span> In Touch</h2>
                            <p className='text-center text-lg px-10'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, quas?</p>
                        </div>
                        <div className='p-10'>
                            <form>
                                <input type="text" className='w-full h-10 px-5 py-1 mb-5' placeholder='Your Name' />
                                <input type="email" className='w-full h-10 px-5 py-1 mb-5' placeholder='Your Email Address' />
                                <input type="text" className='w-full h-10 px-5 py-1 mb-5' placeholder='Your Phone Number' />
                                <textarea name="message" className='w-full h-28 px-5 py-2 mb-5' placeholder='Your Message'></textarea>
                                <button className='bg-green-500 px-10 py-3 text-white'>Get a Call Back</button>
                            </form>
                        </div>
                    </div>
                    <div>
                        <iframe title='contact' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d71179.99470816138!2d77.12788094508815!3d28.663074358956962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1698342305365!5m2!1sen!2sin" className='h-screen w-[50vw]' style={{ border: "0" }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>

            </section>
        </section>
       
    )
}
