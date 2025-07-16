import ContactUsForm from '@/components/pages/ConatctUs/ContactUsForm'
import AboutSection from '@/components/pages/Home/AboutUs'
import HeroSectionWithBreadcrumbAndHeaderSubTitle from '@/components/shared/HeroSectionWithBreadcrumbAndHeaderSubTitle/HeroSectionWithBreadcrumbAndHeaderSubTitle'
import NewsletterSignup from '@/components/shared/Newsletter/NewsLetter'
import React from 'react'

export default function ContactUsPage() {
    return (
        <div>
            <HeroSectionWithBreadcrumbAndHeaderSubTitle
                breadcrumbs={[
                    { title: "Home", href: "/" },
                    { title: "Contact Us" }
                ]}
                title="Contact Us"
                subtitle="Lorem ipsum dolor sit amet consectetur. Gravida consequat et et pharetra. A facilisis est consequat cras imperdiet tristique. Auctor purus sed lacus varius fringilla enim tortor ut vestibulum"
                backgroundImage="/assets/hero.png"
            />
            <ContactUsForm />
            <AboutSection />
            <NewsletterSignup /> 
        </div>
    )
}
