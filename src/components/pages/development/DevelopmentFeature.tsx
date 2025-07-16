import FeaturedCard from '@/components/shared/FeaturedCard/FeaturedCard'
import { fakeSavePropertyData } from '@/data/fakeAreasData'
import React from 'react'

export default function DevelopmentFeature() {
  return (
    <section className='container mx-auto my-10'>
        <h2 className='text-3xl font-bold my-10 text-center'>Featured New Development Properties</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {fakeSavePropertyData?.map((property) => <FeaturedCard key={property.id} property={property}/>)}
          </div>
    </section>
  )
}
