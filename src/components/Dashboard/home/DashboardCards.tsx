"use client"

import { HomeIcon } from "lucide-react"

export default function DashboardCard() {
  return (
    <div className=" flex items-center justify-between gap-8 my-10">
      {/* Total Properties Card */}
      <div className=" flex-1 h-40 bg-[#E2C59F] rounded-xl p-8 flex items-center shadow-md min-w-[420px] max-w-[60%]">
        <div className="flex items-center gap-6 w-full">
            <HomeIcon className="text-white  w-12 h-12" />
         
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-[#222] text-xl font-semibold">Total Properties</h3>
            </div>
            <div className="flex items-center gap-10">
                <div className="relative mt-4 mb-2 h-2 w-full bg-[#e9e6e0] rounded-full overflow-hidden">
                <div className="absolute left-0 top-0 h-2 bg-white rounded-full" style={{ width: "80%" }} />
                </div>
              <span className="text-[#222] text-4xl font-bold tracking-tight">4,562</span>

            </div>
            <p className="text-[#222] text-xs opacity-80 mt-2">431 more to break last month record</p>
          </div>
        </div>
      
      </div>

      {/* Right Side Stats */}
      <div className="flex flex-col gap-6 min-w-[30%]">
        {/* Properties for Sale */}
        <div className="bg-white rounded-xl px-6 py-8 shadow-sm border border-gray-100 flex items-center justify-between min-w-[260px]">
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">2,356</div>
            <div className="text-gray-600 text-sm">Properties for Sale</div>
          </div>
          <div className="relative w-16 h-16">
            {/* Progress Circle */}
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="28" stroke="#f3f4f6" strokeWidth="6" fill="none" />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="#E2C59F"
                strokeWidth="6"
                fill="none"
                strokeDasharray={`${71 * 1.76} 176`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-semibold text-gray-700">71%</span>
            </div>
          </div>
        </div>

        {/* Properties for Rent */}
        <div className="bg-white rounded-xl px-6 py-8 shadow-sm border border-gray-100 flex items-center justify-between min-w-[260px]">
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">2,356</div>
            <div className="text-gray-600 text-sm">Properties for Rent</div>
          </div>
          <div className="relative w-16 h-16">
            {/* Progress Circle */}
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="28" stroke="#f3f4f6" strokeWidth="6" fill="none" />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="#E2C59F"
                strokeWidth="6"
                fill="none"
                strokeDasharray={`${71 * 1.76} 176`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-semibold text-gray-700">71%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
