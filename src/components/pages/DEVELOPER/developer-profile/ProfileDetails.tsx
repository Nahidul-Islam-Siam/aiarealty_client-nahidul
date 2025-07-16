/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { useEffect, useState } from "react";

import {
  useGetUserQuery,
  useUpdateUserProfileMutation,
} from "@/redux/service/profileData";
import Image from "next/image";
import { toast } from "sonner";
import { ChangePassword } from "./ChangePassword";

export default function ProfileDetails() {
  const { data } = useGetUserQuery(undefined);
  const profile = data?.data?.profile;
  const userData = data?.data;

  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  const [formData, setFormData] = useState({
    agencyName: "",
    email: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    postalCode: "",
    state: "",
    country: "",
    registrationNo: "",
    taxId: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    terms: false,
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (profile && userData) {
      setFormData({
        agencyName: profile?.company || "",
        email: userData?.email || "",
        phoneNumber: profile?.phone || "",
        streetAddress: profile?.streetAddress || "",
        city: profile?.city || "",
        postalCode: profile?.zipCode || "",
        state: profile?.region || "",
        country: profile?.country || "",
        registrationNo: profile?.registrationId || "",
        taxId: profile?.TaxId || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        terms: false,
      });

      const imageUrl =
        Array.isArray(profile?.Image) && profile.Image.length > 0
          ? profile.Image[0].url
          : null;
      console.log("image:", imageUrl);
      setProfileImage(imageUrl);
    }
  }, [profile, userData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImageFile(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileImageFile) {
      toast("Please select a profile image.");
      return;
    }

    const bodyData = {
      name: formData.agencyName,
      phone: formData.phoneNumber,
      streetAddress: formData.streetAddress,
      city: formData.city,
      zipCode: formData.postalCode,
      region: formData.state,
      country: formData.country,
      registrationId: formData.registrationNo,
      TaxId: formData.taxId,
      company: formData.agencyName,
    };

    try {
      const res = await updateUserProfile({
        image: profileImageFile,
        bodyData,
      }).unwrap();
      toast.success("Profile updated successfully!");
      console.log(res);
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Something went wrong while updating profile.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex justify-center mt-6 mb-8">
        <button className="bg-[#E2B887] text-white px-8 py-2 rounded-full text-sm font-medium shadow-none cursor-default">
          My Profile
        </button>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl px-6 py-4 flex items-center justify-between mb-8 shadow-sm">
          <div className="flex items-center gap-4 relative">
            <div className="relative w-14 h-14">
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt="Profile"
                  className="rounded-full object-cover"
                  fill
                  sizes="56px"
                  unoptimized
                />
              ) : (
                <div className="w-14 h-14 bg-gray-300 rounded-full" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
                title="Change profile image"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-base text-[#222]">
                  {formData.agencyName}
                </span>
              </div>
              <span className="text-xs text-[#666] block">
                {formData.email}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <button className="bg-[#2586D0] text-white px-5 py-2 rounded-md text-sm font-medium">
              Verify Your Documents
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl px-6 py-8 mb-8 shadow-sm">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {[
                {
                  label: "Agency Name*",
                  name: "agencyName",
                  placeholder: "Enter agency name",
                },
                {
                  label: "Email*",
                  name: "email",
                  placeholder: "Enter email",
                  type: "email",
                },
                {
                  label: "Phone number*",
                  name: "phoneNumber",
                  placeholder: "+8801...",
                },
                {
                  label: "Street Address*",
                  name: "streetAddress",
                  placeholder: "Enter your street address",
                },
                { label: "City*", name: "city", placeholder: "Enter city" },
                {
                  label: "Postal Code*",
                  name: "postalCode",
                  placeholder: "Enter postal code",
                },
                {
                  label: "State/Province*",
                  name: "state",
                  placeholder: "Enter state",
                },
                {
                  label: "Country*",
                  name: "country",
                  placeholder: "Enter country",
                },
                {
                  label: "Registration No*",
                  name: "registrationNo",
                  placeholder: "Enter registration no",
                },
                {
                  label: "Tax ID*",
                  name: "taxId",
                  placeholder: "Enter tax id",
                },
              ].map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block text-xs font-medium text-[#222] mb-1"
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type || "text"}
                    id={field.name}
                    name={field.name}
                    value={(formData as any)[field.name]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2 border border-[#E2E8F0] rounded bg-[#FAFAFA] text-sm focus:outline-none focus:ring-2 focus:ring-[#E2B887]"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-start">
              <button
                type="submit"
                className="bg-[#E2B887] text-white px-8 py-2 rounded text-sm font-medium mt-2"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>
        </div>

        {/* Change Password */}
        <ChangePassword/>
      </div>
    </div>
  );
}
