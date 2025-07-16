import AboutSection from '@/components/pages/Home/AboutUs'
import FeaturedPropertise from '@/components/pages/Home/FeaturedPropertise'
import SellContact from '@/components/pages/sell-with-us/SellContact'
import CommonHeader from '@/components/shared/CommonHeader.tsx/CommonHeader'
import HeroSectionWithSingleRowFilter from '@/components/shared/HeroSectionWithSignleRowFilter/HeroSectionWithSingleRowFilter'
import NewsletterSignup from '@/components/shared/Newsletter/NewsLetter'
import React from 'react'

export default function page() {
  return (
    <div className=''>
      <HeroSectionWithSingleRowFilter
        backgroundImage='/assets/hero.png'
        title='Sell With Us'
      />
      <CommonHeader header="Sell With Us" />
     <AboutSection />
     <FeaturedPropertise />
     <SellContact/>

         <AboutSection />
      <NewsletterSignup />
    </div>
  )
}
