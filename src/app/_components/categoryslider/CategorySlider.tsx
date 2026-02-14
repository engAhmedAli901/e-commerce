import React from 'react'
import Slider from '../slider/Slider';

export default async function CategorySlider() {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`)
    const {data} = await response.json()
    console.log({data});
  return <>
  <Slider data={data} />
  </>
}
