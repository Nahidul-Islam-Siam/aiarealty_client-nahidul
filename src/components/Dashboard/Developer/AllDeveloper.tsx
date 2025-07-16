'use client';
import { useGetPartnersQuery } from '@/redux/service/allPartner/allPartnerApi';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function AllDeveloper() {
  const { data, error, isLoading } = useGetPartnersQuery({
    role: "DEVELOPER",
  });


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading agents. Please try again later.</div>;
  }

 
  const developers = data?.data?.data || [];


  if (developers.length === 0) {
    return <div>No agents found.</div>;
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {developers.map((developer) => (
          <div
            key={developer.id}
            className="flex bg-white rounded-lg shadow-md items-center"
          >
            <div className="h-full rounded-lg bg-gray-200 overflow-hidden">
              {/* Use agent's image if available */}
              <Image
                src={developer.profile?.Image?.[0]?.url || `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`}
                alt={developer.name}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-6 flex-1">
              <h2 className="text-xl font-semibold">{developer.name}</h2>
              <div className="text-sm text-gray-600">{developer.profile?.company || 'No company listed'}</div>
              <div className="text-sm mt-2">
                <span className="font-semibold">Email :</span> {developer.email}
              </div>
              <div className="text-sm">
                <span className="font-semibold">Phone :</span> {developer.profile?.phone || 'N/A'}
              </div>
              <div className="text-sm">
                <span className="font-semibold">Location :</span> {developer.profile?.city || 'Location not provided'}
              </div>
              <Link href={`/dashboard/all-developer/${developer.id}`}>
                <button className="mt-3 w-full bg-[#E5D2B8] text-black text-sm px-6 py-1 rounded-full hover:bg-[#d6c2a4] transition">
                  View Profile
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
