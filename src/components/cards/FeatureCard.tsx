"use client";

import React from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import Locations from "@/components/icon/Locations";

interface FeatureCardProps {
    id: string;
    name: string;
    price: number;
    image: string | StaticImageData;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ name, price, image }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 flex flex-col">
            <div className="relative h-64 w-full">
                <Image
                    src={typeof image === "string" ? image : image.src}
                    alt={name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-2xl"
                />
            </div>

            <div className="p-5 flex flex-col flex-grow justify-between">
                <div className="flex justify-between gap-2 text-[#6C6C6C] md:text-sm text-xs">
                    <h1 className=" mb-1">Homes For Sale</h1>
                    <h1 className=" mb-1 flex items-center gap-1"><Locations /> Los Angeles</h1>
                </div>

                <div className="md:text-2xl text-lg font-bold text-gray-900 mb-2">
                    ${price.toLocaleString()}
                </div>

                <div className="text-sm text-gray-600 mb-6">
                    Single Family Home/House in Beverly Hills, CA
                </div>

                <button className="mt-auto border text-[#E2C59F] border-[#E2C59F]  hover:bg-orange-50 transition-all rounded-full py-2 text-sm font-medium">
                    View Details
                </button>
            </div>
        </div>
    );
};

export default FeatureCard;