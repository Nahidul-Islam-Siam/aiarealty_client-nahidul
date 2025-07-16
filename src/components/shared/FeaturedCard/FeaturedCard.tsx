import Image from 'next/image';
import React from 'react'
type PropType = {
    property: {
        id: number;
        image: string;
        price: string;
        title: string;
        location: string;
        desc: string;
    };
};

export default function FeaturedCard({ property }: PropType) {
    return (
        <div
            key={property.id}
            className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
        >
            <Image
                src={property.image}
                alt={property.title}
            
                className="h-48 w-full object-cover"
                width={600}
                height={400}
            />
            <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">{property.title}</span>
                    <span className="text-xs text-gray-400">{property.location}</span>
                </div>
                <div className="text-xl font-semibold text-gray-800 mb-1">{property.price}</div>
                <div className="text-sm text-gray-600 mb-4">{property.desc}</div>
                <button className="mt-auto bg-orange-100 text-orange-700 rounded-md px-4 py-2 text-sm font-medium hover:bg-orange-200 transition">
                    View Details
                </button>
            </div>
        </div>
    )
}
