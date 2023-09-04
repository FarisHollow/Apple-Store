import HomeLogo from './Layout/HomeLogo';
import Link from 'next/link';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from "next/dynamic";





const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [notice, setNotice] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();
  const applePath = "/apple.jpg" ; 

  
  useEffect(() => {
    const timer = setInterval(() => {
      const nextSlide = currentSlide === 1 ? 2 : 1;
      setCurrentSlide(nextSlide);
    }, 10000); 

    return () => {
      clearInterval(timer);
    };
  }, [currentSlide]);
  


  const handleViewArticle = () => {
    router.push('../Doctor/View_article');
  };
  


    return (
      
      <div className='h-screen w-screen bg-white'>
        

      <div className="navbar bg-black py-0 shadow-xl">
      <div className="flex-1">
        <a><HomeLogo applePath={applePath}></HomeLogo></a>
        <a className="btn btn-ghost normal-case text-xl text-yellow-400">APPLE STORE</a>
      </div>
      <div className="flex-none ">
        <ul className="menu menu-horizontal px-1 ">
          <li className='text-lg text-white' ><Link href="/login">Login</Link></li>
          <li className='text-lg text-white'><Link href="/aboutMe">About Me</Link></li>
   
        </ul>
      </div>
    </div>

    <div className="carousel w-full">
  <div id="slide1" className={`carousel-item relative w-full ${currentSlide === 1 ? 'block' : 'hidden'}`}>
    <img src="/apple1.jpg" className="w-full" />
    <div className="absolute inset-0 bg-black bg-opacity-50 flex  items-center justify-center"></div>
          <div className="absolute inset-0 flex items-center justify-center">
         
            <div className="text-center">
              <h1 className="text-6xl font-serif text-white">We are always at your service</h1>
              <p className="mt-4 font-medium text-white">TRENDINGS</p>
              <button className="btn btn-error text-white mt-7" >
                 View Trends
            </button>
             
            </div>
          </div>
    
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
    <button onClick={() => setCurrentSlide(2)} className="btn btn-circle">❮</button>
      <button onClick={() => setCurrentSlide(2)} className="btn btn-circle">❯</button>
    </div>
  </div> 
  <div id="slide2" className={`carousel-item relative w-full ${currentSlide === 2 ? 'block' : 'hidden'}`}>
    <img src="/apple2.jpg" className="w-full" />
    <div className="absolute inset-0 bg-black bg-opacity-50 flex  place-items-end justify-center"></div>
          <div className="absolute inset-0 flex items-center justify-center">
         
            <div className="text-center">
              <h1 className="text-6xl font-serif text-white">Your choices are our priority</h1>
              <p className="mt-4 font-medium text-white">CHECK FOR INNOVATIVE GADGETS</p>
              <button className="btn btn-error text-white mt-7">What's New?</button>
             
            </div>
          </div>
    
    
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      
    <button onClick={() => setCurrentSlide(1)} className="btn btn-circle">❮</button>
      <button onClick={() => setCurrentSlide(1)} className="btn btn-circle">❯</button>
    </div>
    
  </div> 
  
  
</div>


<div className="hero bg-stone-950py-10">
  <div className="hero-content flex flex-col lg:flex-row-reverse items-center lg:items-start">
    <img src="/box.gif" className="max-w-xs rounded-lg shadow-2xl lg:mr-8" />
    <div className="text-center lg:text-left mt-4 lg:mt-0">
      <h1 className="text-3xl lg:text-5xl font-bold">Box Office News!</h1>
      <p className="py-3 lg:py-6 text-base lg:text-lg">
        La vida es corta. Vive apasionadamente y siente la felicidad.
      </p>
     
        <button className="btn btn-primary">Check Flagships</button>
   
    </div>
  </div>
</div>

  









<footer className="footer p-10 bg-base-200 text-base-content">
  <div>
  <div className="avatar indicator py-3 ">
  <div className="w-20 h-20 rounded-lg">
    <img src="/apple.jpg" />
  </div>
</div>
    <p> Apple Store Bangladesh<br/>Providing technical devices and gadgets from Apple</p>
  </div> 
  <div>
    <span className="footer-title">Services</span> 
    <a className="link link-hover" >Model checkout</a> 
    <a className="link link-hover" >Apple Up to Date</a> 


  </div> 
  <div>
    <span className="footer-title">Company</span> 
    <a className="link link-hover"href='/aboutUs'>About us</a> 
    <a className="link link-hover">Contact</a> 
  </div> 
  <div>
    <span className="footer-title">Legal</span> 
    <a className="link link-hover">Terms of use</a> 
    <a className="link link-hover">Privacy policy</a> 
  </div>
</footer>
    

</div>
      
    );
  };
  
  export default HomePage;