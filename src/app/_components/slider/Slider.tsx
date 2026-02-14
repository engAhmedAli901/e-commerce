"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Producttype } from '../types/Producttype';
import { CategoryType } from '../types/categoryType';
export default function Slider({data}) {
    console.log(data);
    
  return <>
  <Swiper
  className='mt-10'
      spaceBetween={0}
      slidesPerView={7}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {data.map((product)=>(
        <div key={product._id} >
            <SwiperSlide>
            <img src={product.image} className=' h-50 w-full' alt="" />
            <h2 className='text-center text-xl font-bold'>{product.name}</h2>
        </SwiperSlide>
        </div>
       
      ))}
    </Swiper>
  </>
}
