import React from 'react'
import HomeSLider from '../_components/Homeslider/HomeSLider'
import CategorySlider from '../_components/categoryslider/CategorySlider'
import Allproducts from '../_components/Allproducts/Allproducts'

export default async function Home() {
   
  return <>
  <HomeSLider />
  <CategorySlider />
  <Allproducts />
  </>
}
