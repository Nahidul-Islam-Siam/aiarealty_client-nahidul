import { baseApi } from "@/redux/api/baseApi";

interface ProfileImage {
  id: string;
  refId: string;
  refType: string;
  url: string;
  alt: string;
  createdAt: string;
  updatedAt: string;
}

interface ProfileData {
  id: string;
  userId: string;
  name: string;
  phone: string;
  dateOfBirth: string;
  streetAddress: string;
  city: string;
  zipCode: string;
  region: string;
  country: string;
  presentAddress: string;
  permanentAddress: string;
  company: string;
  registrationId: string;
  nationalId: string;
  TaxId: string;
  createdAt: string;
  updatedAt: string;
  Image: ProfileImage[];
}

interface UserProfileResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    userStatus: string;
    approvalStatus: string;
    isEmailVerified: boolean;
    isDeleted: boolean;
    resetToken: string | null;
    resetTokenExpiry: string | null;
    verificationToken: string | null;
    verificationTokenExpiry: string | null;
    createdAt: string;
    updatedAt: string;
    profile: ProfileData;
  };
}

interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: {
    message: string;
    profile: ProfileData;
  };
}

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<UserProfileResponse, void>({
      query: () => ({
        url: "/users/get-profile-data",
        method: "GET",
      }),
    }),

    updateUserProfile: builder.mutation<
      UpdateProfileResponse,
      {
        image: File;
        bodyData: {
          name: string;
          phone: string;
          streetAddress: string;
          city: string;
          zipCode: string;
          region: string;
          country: string;
          registrationId: string;
          TaxId: string;
          company: string;
        };
      }
    >({
      query: ({ image, bodyData }) => {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("bodyData", JSON.stringify(bodyData));

        return {
          url: "/users/update-profile",
          method: "PUT",
          body: formData,
        };
      },
    }),

    changeUserPassword: builder.mutation({
      query: (bodyData) => ({
        url: "/auth/change-password",
        method: "POST",
        body: bodyData,
      })
    })
  }),
});

export const { useGetUserQuery, useUpdateUserProfileMutation, useChangeUserPasswordMutation } = profileApi;
