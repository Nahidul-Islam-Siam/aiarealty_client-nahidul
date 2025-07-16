import DevelopmentFeature from '@/components/pages/development/DevelopmentFeature'
import CommonHeader from '@/components/shared/CommonHeader.tsx/CommonHeader'
import HeroSectionWithBreadcrumbAndHeader from '@/components/shared/HeroSectionWithBreadcrumbAndHeader/HeroSectionWithBreadcrumbAndHeader'
import React from 'react'

export default function page() {
    return (
        <div>
            <HeroSectionWithBreadcrumbAndHeader
                breadcrumbs={[
                    { title: "Home", href: "/development" },
                    { title: "Development" }
                ]}
                title="Development"
                backgroundImage={`/assets/hero.png`}
            />
            <CommonHeader header="Featured Development" paragraph="Lorem ipsum dolor sit amet consectetur. Gravida consequat et et pharetra. A facilisis est consequat cras imperdiet tristique. Auctor purus sed lacus varius fringilla enim tortor ut vestibulum"/>
            <DevelopmentFeature/>
    </div>
    )
}
