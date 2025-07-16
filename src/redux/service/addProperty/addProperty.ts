// import baseApi from "@/redux/api/baseApi";

// // --- Payload for creating a property ---
// export interface CreatePropertyPayload {
//   video?: File;
//   image?: File;
//   cityId: string;
//   propertyTypeId: string;
//   lifestyleId: string;
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
//   listingType: "RENT" | "SALE" | "BUY";
//   developmentStatus: "NEW_DEVELOPMENT" | "DEVELOPED";
// }

// // --- Property Media ---
// export interface PropertyMedia {
//   id: string;
//   refId?: string;
//   propertyId?: string;
//   url: string;
//   alt: string;
//   createdAt: string;
//   updatedAt: string;
// }

// // --- User Info ---
// export interface PropertyUser {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   userStatus: string;
//   approvalStatus: string;
//   isEmailVerified: boolean;
//   isDeleted: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// // --- City, Country, Type, Lifestyle ---
// export interface Country {
//   id: string;
//   countryName: string;
// }

// export interface City {
//   id: string;
//   cityName: string;
//   country: Country;
// }

// export interface PropertyType {
//   id: string;
//   type: string;
//   slug: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface Lifestyle {
//   id: string;
//   lifestyle: string;
//   slug: string;
//   createdAt: string;
//   updatedAt: string;
// }

// // --- Full Property Response ---
// export interface PropertyResponseData {
//   id: string;
//   cityId: string;
//   propertyTypeId: string;
//   lifestyleId: string;
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
//   listingType: string;
//   developmentStatus: string;
//   createdAt: string;
//   updatedAt: string;
//   images: PropertyMedia[];
//   video: PropertyMedia[];
//   user: PropertyUser;
//   City: City;
//   PropertyType: PropertyType;
//   Lifestyle: Lifestyle;
//   results: number;
// }

// // --- Base Response Wrapper ---
// export interface PropertyResponse {
//   success: boolean;
//   message: string;
//   data: PropertyResponseData;

// }

// // --- Filter Query Interface ---
// export interface PropertyFilterQuery {
//   searchTerm?: string;
//   page?: number;
//   limit?: number;
//   listingType?: string;
//   maxBedRooms?: number;
//   minBedRooms?: number;
//   maxSquareFeet?: number;
//   minSquareFeet?: number;
//   maxArea?: number;
//   minArea?: number;
//   lifeStyle?: string;
//   featureNames?: string;
// }

// // --- Injected API Endpoints ---
// export const propertyApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     createProperty: builder.mutation<PropertyResponse, CreatePropertyPayload>({
//       query: (payload) => ({
//         url: "/property",
//         method: "POST",
//         body: payload,
//       }),
//     }),

//     getProperty: builder.query<PropertyResponse, PropertyFilterQuery>({
//       query: (paramsObj) => {
//         const params = new URLSearchParams();
//         Object.entries(paramsObj).forEach(([key, value]) => {
//           if (value !== undefined && value !== null) {
//             params.append(key, value.toString());
//           }
//         });

//         return {
//           url: `/property?${params.toString()}`,
//           method: "GET",
//         };
//       },
//     }),
//   }),
// });

// // --- Export Hooks ---
// export const {
//   useCreatePropertyMutation,
//   useGetPropertyQuery,
// } = propertyApi;

// // import baseApi from "@/redux/api/baseApi";

// // // Adjusted CreatePropertyPayload (for reference to match backend data structure)
// // export interface CreatePropertyPayload {
// //   video?: File;
// //   image?: File;
// //   cityId: string;
// //   propertyTypeId: string;
// //   lifestyleId: string;
// //   title: string;
// //   description: string;
// //   address: string;
// //   zipCode: string;
// //   lat: number;
// //   long: number;
// //   bedRooms: number;
// //   bathRooms: number;
// //   price: number;
// //   squareFeet: number;
// //   area: number;
// //   featureNames: string[];
// //   listingType: "RENT" | "SALE" | "BUY";
// //   developmentStatus: "NEW_DEVELOPMENT" | "DEVELOPED";
// // }

// // export interface PropertyMedia {
// //   id: string;
// //   refId?: string;
// //   propertyId?: string;
// //   url: string;
// //   alt: string;
// //   createdAt: string;
// //   updatedAt: string;
// // }

// // export interface PropertyUser {
// //   id: string;
// //   name: string;
// //   email: string;
// //   role: string;
// //   userStatus: string;
// //   approvalStatus: string;
// //   isEmailVerified: boolean;
// //   isDeleted: boolean;
// //   createdAt: string;
// //   updatedAt: string;
// // }

// // export interface Country {
// //   id: string;
// //   countryName: string;
// // }

// // export interface City {
// //   id: string;
// //   cityName: string;
// //   country: Country;
// // }

// // export interface PropertyType {
// //   id: string;
// //   type: string;
// //   slug: string;
// //   createdAt: string;
// //   updatedAt: string;
// // }

// // export interface Lifestyle {
// //   id: string;
// //   lifestyle: string;
// //   slug: string;
// //   createdAt: string;
// //   updatedAt: string;
// // }

// // // Backend Response
// // export interface PropertyResponseData {
// //   id: string;
// //   cityId: string;
// //   propertyTypeId: string;
// //   lifestyleId: string;
// //   title: string;
// //   description: string;
// //   address: string;
// //   zipCode: string;
// //   lat: number;
// //   long: number;
// //   bedRooms: number;
// //   bathRooms: number;
// //   price: number;
// //   squareFeet: number;
// //   area: number;
// //   featureNames: string[];
// //   listingType: string;
// //   developmentStatus: string;
// //   createdAt: string;
// //   updatedAt: string;
// //   images: PropertyMedia[];
// //   video: PropertyMedia[];
// //   user: PropertyUser;
// //   City: City;
// //   PropertyType: PropertyType;
// //   Lifestyle: Lifestyle;
// // }

// // export interface PropertyResponse {
// //   success: boolean;
// //   message: string;
// //   data: PropertyResponseData;
// // }

// // // Updated API for createProperty
// // export const propertyApi = baseApi.injectEndpoints({
// //   endpoints: (builder) => ({
// //     createProperty: builder.mutation<PropertyResponse, CreatePropertyPayload>({
// //       query: (payload) => {
// //         return {
// //           url: "/property",
// //           method: "POST",
// //           body: payload,
// //         };
// //       },
// //     }),
// //   }),
// // });

// // export const { useCreatePropertyMutation } = propertyApi;
