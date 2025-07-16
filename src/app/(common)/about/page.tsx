import AboutCardOne from '@/components/pages/about/AboutCardOne'
import AboutCardSecond from '@/components/pages/about/AboutCardSecond'
import HeroSectionWithBreadcrumbAndHeaderSubTitle from '@/components/shared/HeroSectionWithBreadcrumbAndHeaderSubTitle/HeroSectionWithBreadcrumbAndHeaderSubTitle'
import NewsletterSignup from '@/components/shared/Newsletter/NewsLetter'
import React from 'react'

export default function page() {
  return (
    <div>
       <HeroSectionWithBreadcrumbAndHeaderSubTitle
                breadcrumbs={[
                    { title: "Home", href: "/about" },
                    { title: "About Us" }
                ]}
                title="About Us"
                subtitle="Lorem ipsum dolor sit amet consectetur. Gravida consequat et et pharetra. A facilisis est consequat cras imperdiet tristique. Auctor purus sed lacus varius fringilla enim tortor ut vestibulum"
                backgroundImage="/assets/hero.png"
            />
            <h1 className="text-4xl font-bold text-center my-16">About Us</h1>
            {/* <AboutSection /> */}
            <AboutCardOne />
            {/* <BrandContactSection /> */}
            <AboutCardSecond/>
             <NewsletterSignup />
    </div>
  )
}
