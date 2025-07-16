"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Share2, Bed, Bath } from "lucide-react";
import PropertyHero from "./PropertyHero/PropertyHero";
import { Button, Input } from "antd";
const { TextArea } = Input;

const property = {
  id: 2,
  images: [
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
  ],
  price: "$1,180,000",
  title: "Modern Villa Estate",
  location: "Malibu, CA",
  beds: 5,
  baths: "2/2",
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
    "Contemporary villa with panoramic ocean views and premium finishes. In the heart of Ann Arbor Hills, this 1964 Mid Century Modern, designed by renowned architect, Robert C Metcalf, is a flawless balance of form and function. With most of its original architectural details perfectly preserved, it features carefully placed windows that bring the outside in and fill the interior with natural light, warm wood accents, and timeless ceramic tile floors. The main level has a spacious and open living room with fireplace, formal dining room, classic galley-style kitchen with walk-in pantry & eating space, and half bath. Upstairs there are 4 bedrooms and 2 full baths all inundated with natural light. The daylight lower level has a family room, home office, and half bath. The entire back of the house overlooks an expansive backyard with mature trees and landscaping. This home offers the perfect blend of mid-century charm and modern convenience, making it an ideal choice for those who appreciate architectural significance and comfortable living.",
};

export default function PropertyDetails() {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };
  const img =
    "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg";

  return (
    <div className=" ">
      <PropertyHero />

      <div className="mt-10">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <span>Home</span>
          <span>›</span>
          <span>Homes For Sale</span>
          <span>›</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Header */}
            <div className="bg-white  border-b-2 border-gray-200 border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                    {property.title}
                  </h1>
                  <p className="text-3xl font-bold text-gray-900">
                    {property.price}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button>
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Property Stats */}
              <div className="flex py-6 space-x-6 text-gray-600 ">
                <div className="flex items-center space-x-1">
                  <Bed className="h-4 w-4" />
                  <span className="font-semibold text-gray-900">
                    {property.beds}
                  </span>
                  <span>Bedrooms</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Bath className="h-4 w-4" />
                  <span className="font-semibold text-gray-900">
                    {property.baths}
                  </span>
                  <span>Bathrooms</span>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="bg-white py-6 border-b-2 border-gray-200">
              <h2 className="text-lg font-semibold mb-4">FEATURES</h2>
              <div className="text-gray-600 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {property.amenities.map((amenity: string, index: number) => (
                  <p key={index}>{amenity}</p>
                ))}
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white  py-6  border-b-2 border-gray-200">
              <h2 className="text-lg font-semibold mb-4">DESCRIPTION</h2>
              <div className="text-gray-600 leading-relaxed">
                <p>{property.description.slice(0, 200)}...</p>
                {showFullDescription && (
                  <p>{property.description.slice(200)}</p>
                )}
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-blue-600 hover:text-blue-800 mt-2 font-medium"
                >
                  {showFullDescription ? "Read Less" : "Read More"}
                </button>
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-lg py-6 shadow-sm border-gray-200">
              <h2 className="text-lg font-semibold mb-4">MAP</h2>
              {/* gg */}
              <div className="h-80 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    property.location || ""
                  )}&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Event locations map"
                />
              </div>
            </div>
          </div>

          {/* Contact Sidebar */}
          <div className="lg:col-span-1 ">
            <div className="sticky top-6 border-2 shadow-lg rounded-lg border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Contact</h3>

                {/* Agent Info */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className="  ">
                    <Image
                      src={img || "/placeholder.svg?height=48&width=48"}
                      //   src={
                      //     property.agent.avatar ||
                      //     "/placeholder.svg?height=48&width=48"
                      //   }
                      alt={property.agent.name}
                      width={400}
                      height={400}
                      className="object-cover w-12 h-12 rounded-full"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {property.agent.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {property.agent.phone}
                    </p>
                    <p className="text-sm text-gray-600">
                      {property.agent.email}
                    </p>
                  </div>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full name*
                    </label>
                    <Input placeholder="Enter your name" required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email*
                    </label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subjects*
                    </label>
                    <Input placeholder="Subject" required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message*
                    </label>
                    <TextArea
                      placeholder="Write about your message"
                      rows={4}
                      required
                    />
                  </div>

                  <Button className="w-full bg-[#e2c59f] py-5 text-black font-bold hover:bg-amber-700">
                    Send Now
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
