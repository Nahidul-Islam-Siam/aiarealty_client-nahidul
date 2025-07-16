/* eslint-disable @typescript-eslint/no-explicit-any */
// redux/service/addProperty/propertyApi.ts

import { RcFile } from "antd/es/upload/interface";
import baseApi from "@/redux/api/baseApi"; // ✅ use your shared baseApi
import { TPropertyResponse } from "@/interface/globalType";

export interface PropertyFormBody {
  cityId: string;
  propertyTypeId: string;
  lifestyleId: string;
  title: string;
  description: string;
  address: string;
  zipCode: string;
  lat: number;
  long: number;
  bedRooms: number;
  bathRooms: number;
  price: number;
  squareFeet: number;
  area: number;
  listingType: "BUY" | "RENT" | "SALE";
  developmentStatus: "NEW_DEVELOPMENT" | "DEVELOPED";
  featureNames: string[];
}

export interface PropertyFilterParams {
  maxSquareFeet?: number;
  minSquareFeet?: number;
  maxArea?: number;
  minArea?: number;
  lifestyle?: string[];
  featureNames?: string[];
  searchTerm?: string;
  listingType?: "BUY" | "RENT" | "SALE";
  minBedRooms?: number;
  minBathRooms?: number;
  minPrice?: number;
  maxPrice?: number;
  propertyType?: string[];
  maxBedRooms?: number;
  sort?: string;
}

export interface PropertyPayload {
  videos: RcFile;
  images: RcFile[];
  bodyData: PropertyFormBody;
}

const propertyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProperty: builder.mutation<any, PropertyPayload>({
      query: ({ videos, images, bodyData }) => {
        const formData = new FormData();
        formData.append("videos", videos);
        images.forEach((img) => formData.append("images", img));
        formData.append("bodyData", JSON.stringify(bodyData));

        return {
          url: "/property",
          method: "POST",
          body: formData,
        };
      },
    }),

    getProperty: builder.query<TPropertyResponse, PropertyFilterParams>({
      query: (params) => {
        return {
          url: `/property`,
          method: "GET",
          params: { ...params },
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const { useCreatePropertyMutation, useGetPropertyQuery } = propertyApi;
