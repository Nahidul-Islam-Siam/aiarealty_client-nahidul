import AgentList from '@/components/pages/find-agent/AgentList'
import FeaturedPropertise from '@/components/pages/Home/FeaturedPropertise'
import CommonHeader from '@/components/shared/CommonHeader.tsx/CommonHeader'
import HeroSectionWithSingleRowFilter from '@/components/shared/HeroSectionWithSignleRowFilter/HeroSectionWithSingleRowFilter'
import NewsletterSignup from '@/components/shared/Newsletter/NewsLetter'
import React from 'react'

export default function page() {
  return (
    <div>
      <HeroSectionWithSingleRowFilter 
      backgroundImage='/assets/hero.png'
      title='Professional'
      />
      <CommonHeader header="Professional" />
        <AgentList />
         <FeaturedPropertise />
        <NewsletterSignup/>
    </div>
  )
}
