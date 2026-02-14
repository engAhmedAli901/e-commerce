"use client"
import React from 'react'
import slide1 from '../../../../public/assets/slider1.jpg'
import slide2 from '../../../../public/assets/slider2.jpg'
import slide3 from '../../../../public/assets/slider3.jpg'
import img1 from '../../../../public/assets/img1.webp'
import img2 from '../../../../public/assets/img2.jpg'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules'
export default function HomeSLider() {
  return <>
  <div className="container w-[80%] mx-auto items- mt-10 ">
    <div className='flex'>
       <div className='w-3/4 '>
    <Swiper className='rounded-s-2xl  rounded-bl-2xl'
      spaceBetween={0}
      slidesPerView={1}
      modules={[Autoplay]}
      autoplay={{delay:2000}}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide><Image src={slide1} className='w-full object-fill rounded-bl-2xl'></Image></SwiperSlide>
      <SwiperSlide><Image src={slide2} className='w-full object-fill  rounded-bl-2xl'></Image></SwiperSlide>
      <SwiperSlide><Image src={slide3} className='w-full object-fill rounded-bl-2xl'></Image></SwiperSlide>      ...
    </Swiper>
  
  </div>
  <div className='w-1/4'>
  <Image src={img1} className='w-full object-cover h-[50%]  rounded-tr-2xl'></Image>
  <Image src={img2} className='w-full object-cover h-[46%] rounded-br-2xl'></Image>
  </div>

    </div>
   
     </div>
  </>
}
