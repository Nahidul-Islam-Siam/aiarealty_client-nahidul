"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "antd";

// Property data with images and other details
const propertyData = {
  id: 2,
  images: [
    "https://i.ibb.co/rKWy4K7d/image-7.png",
    "https://i.ibb.co/Nds5h46B/image-6.png",
    "https://i.ibb.co/whQBBSC0/image-8.png",
    "https://i.ibb.co/zhdT6HHb/image-9.png",
    "https://i.ibb.co/rKWy4K7d/image-7.png",
    "https://i.ibb.co/Nds5h46B/image-6.png",
    "https://i.ibb.co/whQBBSC0/image-8.png",
    "https://i.ibb.co/zhdT6HHb/image-9.png",
    "https://i.ibb.co/Nds5h46B/image-6.png",
    "https://i.ibb.co/whQBBSC0/image-8.png",
    "https://i.ibb.co/zhdT6HHb/image-9.png",
    "https://i.ibb.co/rKWy4K7d/image-7.png",
    "https://i.ibb.co/Nds5h46B/image-6.png",
    "https://i.ibb.co/whQBBSC0/image-8.png",
  ],
  price: "$1,180,000",
  title: "Modern Villa Estate",
  location: "Malibu, CA",
  beds: 5,
  baths: 4,
  sqft: "3,200",
  featured: false,
  rating: 4.9,
  reviews: 18,
  yearBuilt: 2019,
  parking: 3,
  propertyType: "Villa",
  status: "For Sale",
  daysOnMarket: 8,
  agent: {
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    phone: "(555) 987-6543",
    email: "michael@luxuryrealty.com",
  },
  amenities: ["Ocean View", "Wine Cellar", "Home Theater", "Chef's Kitchen"],
  description:
    "Contemporary villa with panoramic ocean views and premium finishes.",
};

export default function PropertyHero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % propertyData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + propertyData.images.length) % propertyData.images.length
    );
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4  lg:px-0">
      <div className="flex flex-col lg:flex-row gap-6 h-[600px] md:h-[1000] lg:h-[600px]">
        {/* Main Image Display */}
        <div className="relative flex-1 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={propertyData.images[currentImageIndex] || "/placeholder.svg"}
            alt={`Image ${currentImageIndex + 1}`}
            fill
            className="object-cover"
            priority
          />

          {/* Navigation Arrows */}
          <Button
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white/90 shadow-md"
            onClick={prevImage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white/90 shadow-md"
            onClick={nextImage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Thumbnail Grid */}
        <div className="w-full lg:w-72 overflow-x-auto lg:overflow-y-auto grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-2 gap-2 mt-4 lg:mt-0">
          {propertyData.images.map((image, index) => (
            <button
              key={index}
              onClick={() => selectImage(index)}
              className={`relative aspect-square rounded-lg transition-all duration-200 ${
                currentImageIndex === index ? "opacity-60" : "hover:opacity-80"
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
