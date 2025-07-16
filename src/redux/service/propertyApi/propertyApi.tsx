// /* eslint-disable @typescript-eslint/no-explicit-any */
// import baseApi from "@/redux/api/baseApi";

// // --- Interfaces ---

// export interface PropertyResponse {
//   success: boolean;
//   message: string;
//   meta: {
//     page: number;
//     limit: number;
//     total: number;
//     totalPage: number;
//   };
//   data: {
//     locations: Location[];
//     results: Property[];
//   };
// }

// export interface Location {
//   lat: number;
//   long: number;
// }

// export interface Property {
//   id: string;
//   userId: string;
//   cityId: string;
//   propertyTypeId: string | null;
//   lifestyleId: string | null;
//   title: string;
//   description: string;
//   address: string;
//   zipCode: string;
//   lat: number;
//   long: number;
//   bedRooms: number;
//   bathRooms: number;
//   price: number;
//   squareFeet: number;
//   area: number;
//   featureNames: string[];
//   listingType: "BUY" | "RENT";
//   developmentStatus: "NEW_DEVELOPMENT" | "DEVELOPED";
//   createdAt: string;
//   updatedAt: string;
//   images: Image[];
//   Lifestyle: any | null;
//   City: any | null;
// }

// export interface Image {
//   id: string;
//   refId: string;
//   refType: string;
//   url: string;
//   alt: string;
//   createdAt: string;
//   updatedAt: string;
// }

// // --- API Slice ---

// export const propertyApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getProperties: builder.query<PropertyResponse, {page?: number}>({
//       query: () => ({
//         url: "/property",
//         method: "GET",
//       }),
//     }),
//   }),
// });

// export const {
//   useGetPropertiesQuery,
// } = propertyApi;
