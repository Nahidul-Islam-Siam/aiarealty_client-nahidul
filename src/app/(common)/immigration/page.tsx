
import React from 'react'
import ImmigrationAbout from '@/components/pages/immigration/ImigrationAbout'
import WhyChooseMortgage from '@/components/pages/mortgage/WhyChooseMortgage'
import SellContact from '@/components/pages/sell-with-us/SellContact'
import CommonHeader from '@/components/shared/CommonHeader.tsx/CommonHeader'
import HeroSectionWithSingleRowFilter from '@/components/shared/HeroSectionWithSignleRowFilter/HeroSectionWithSingleRowFilter'
import NewsletterSignup from '@/components/shared/Newsletter/NewsLetter'

export default function page() {
  return (
    <div>
      <HeroSectionWithSingleRowFilter
      title='Immigration Services'
      backgroundImage="/assets/hero.png"
      />
      <CommonHeader header='Helping clients with immigration services'/>
     <ImmigrationAbout/>
     <WhyChooseMortgage/>
     <SellContact/>
     <NewsletterSignup/> 
    </div>
  )
}
