"use client";

import logo from "@/assets/logo/logo.png";
import { cn } from "@/lib/utils";
import { logout } from "@/redux/features/auth";
// import { useGetUserQuery } from "@/redux/service/profileData";
import { RootState } from "@/redux/store";
import { DownOutlined, GlobalOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Drawer, Dropdown, Space, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const { Text } = Typography;

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const sign = useSelector((state: RootState) => state.auth.user);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  // const { data } = useGetUserQuery();
  const role = sign?.role;

  useEffect(() => {
    const handleScroll = () => {
      const threshold = sign ? 20 : 50;
      setIsSticky(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sign]);


  const getRoleBasedLinks = () => {
    const defaultLinks = [
{ href: "/search-page?listingType=BUY", label: "Buy" },
{ href: "/search-page?listingType=RENT", label: "Rent" },

      { href: "/search", label: "Sell" },
      { href: "/development", label: "Development" },
      { href: "/mortgage", label: "Mortgage" },
      { href: "/find-agent", label: "Find Agents" },
      { href: "/professional", label: "Professional" },
    ];

    if (role === "USER") {
      return [
        ...defaultLinks,
     
      ];
    }

    if (role === "AGENT") {
      return [
     { href: "/search-page?listingType=BUY", label: "Buy" },
{ href: "/search-page?listingType=RENT", label: "Rent" },

        { href: "/add-property", label: "Add Property" },
        { href: "/sell-with-us", label: "Sell With Us" },
        { href: "/find-mortgage", label: "Find Mortgage" },
        { href: "/development", label: "Development" },
        { href: "/about", label: "About" },
     
      ];
    }

    if (role === "DEVELOPER") {
      return [
     { href: "/search-page?listingType=BUY", label: "Buy" },
{ href: "/search-page?listingType=RENT", label: "Rent" },
        { href: "/add-property", label: "Add Property" },
        { href: "/sell-with-us", label: "Sell With Us" },
        { href: "/find-mortgage", label: "Find Mortgage" },
        { href: "/development", label: "Development" },
        { href: "/about", label: "About" },
      ];
    }

    return defaultLinks;
  };

  const roleBasedLinks = getRoleBasedLinks();

  const avatarMenuItems: MenuProps["items"] = [
    {
      key: "profileOrDashboard",
      label: (
        <Link href={role === "ADMIN" ? "/dashboard" : "/profile"}>
          <Text strong>
            {role === "ADMIN" ? "Admin Dashboard" : "View Profile"}
          </Text>
        </Link>
      ),
    },
    { type: "divider" },
    {
      key: "logout",
      label: (
        <Text
          onClick={() => dispatch(logout())}
          className="!w-full block"
          strong
          style={{ color: "#ff4d4f" }}
        >
          Log Out
        </Text>
      ),
    },
  ];

const NavMenu = () => (
  <div className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-5 font-normal text-[10px] sm:text-xs md:text-[16px] text-gray-700">
    {roleBasedLinks.map((link) => (
      <Link
        key={link?.href}
        href={link?.href}
        className="hover:text-[#E2C59F] transition-colors whitespace-nowrap"
      >
        {link?.label}
      </Link>
    ))}
  </div>
);



  const ForMobile = () => (
    <div className="flex justify-between items-center px-4 lg:hidden h-16 shadow-sm bg-white z-50">
      <Link href="/">
        <Image
          src={logo}
          alt="AIA Realty Logo"
          width={180}
          height={40}
          className="object-contain"
        />
      </Link>
      <button onClick={() => setOpen(true)} className="p-2">
        <IoMenu size={24} className="text-gray-700" />
      </button>

      <Drawer
        title={
          <div className="flex justify-center">
            <Image
              src={logo}
              alt="AIA Realty Logo"
              width={200}
              height={50}
              className="object-contain"
            />
          </div>
        }
        placement="left"
        width="75%"
        open={open}
        onClose={() => setOpen(false)}
        closeIcon={false}
        extra={
          <Space>
            <button
              onClick={() => setOpen(false)}
              className="hover:text-red-500"
            >
              <IoClose size={24} />
            </button>
          </Space>
        }
      >
        <div className="h-full flex flex-col justify-between">
          <div className="flex flex-col w-full mb-6 gap-4 text-base sm:text-lg md:text-xl">
            {roleBasedLinks?.map((link) => (
              <Link
                key={link?.href}
                href={link?.href}
                className="font-medium py-2 border-b border-gray-100 hover:text-[#E2C59F] transition-colors"
              >
                {link?.label}
              </Link>
            ))}
          </div>

          {!sign ? (
            <div className="space-y-3 text-sm">
              <div className="flex justify-center items-center gap-2 bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 transition-colors">
                <UserOutlined />
                <Link href="/login">Log in</Link>
                <span>/</span>
                <Link href="/signup">Join</Link>
              </div>
              <Link
                href="/global-settings"
                className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 font-medium py-3 rounded-md hover:bg-gray-50 transition-colors"
              >
                <GlobalOutlined />
                Global Setting
              </Link>
            </div>
          ) : (
            <div className="space-y-4 text-sm">
              <Dropdown
                menu={{ items: avatarMenuItems }}
                trigger={["click"]}
                placement="bottomRight"
              >
                <div className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <Avatar
                    src="https://i.pravatar.cc/150?img=3"
                    size="large"
                    className="border-2 border-gray-200"
                  />
                  <div className="flex flex-col overflow-hidden">
                    <Text strong className="truncate">
                      {sign?.name}
                    </Text>
                    <Text type="secondary" className="truncate">
                      {sign?.email}
                    </Text>
                  </div>
                  <DownOutlined className="text-gray-500 text-sm" />
                </div>
              </Dropdown>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );

  return (
    <div className="w-full font-inter">
      {!sign && (
        <div className="hidden lg:block bg-[#D7DCE0] border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-2">
            <div className="flex justify-end items-center gap-6 text-sm text-[#6C6C6C]">
              <Link
                href="/login"
                className="hover:text-blue-600 flex items-center gap-1"
              >
                <UserOutlined /> Log in/Join
              </Link>
              <Link
                href="/global-settings"
                className="hover:text-blue-600 flex items-center gap-1"
              >
                <GlobalOutlined /> Global Setting
              </Link>
            </div>
          </div>
        </div>
      )}

      <div
        className={cn(
          "shadow-sm bg-white transition-all duration-300 ease-in-out",
          isSticky
            ? "fixed top-0 left-0 right-0 z-50 shadow-md"
            : "relative z-auto"
        )}
      >
      <div className="hidden lg:flex py-4 items-center justify-between max-w-7xl mx-auto px-6">
  {/* Left: Logo */}
  <Link href="/" className="flex items-center">
    <Image
      src={logo}
      alt="AIA Realty Logo"
      width={220}
      height={50}
      className="object-contain"
    />
  </Link>

  {/* Right: NavMenu + User Dropdown */}
  <div className="flex items-center gap-6">
    <NavMenu />
    {sign && (
      <Dropdown
        menu={{ items: avatarMenuItems }}
        trigger={["click"]}
        placement="bottomRight"
      >
        <div className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Avatar
            src="https://i.pravatar.cc/150?img=3"
            className="border-2 border-gray-200"
          />
          <div className="flex flex-col leading-tight">
            <Text strong className="text-gray-800 text-sm truncate">
              {sign?.name}
            </Text>
            <Text type="secondary" className="text-xs">
              {sign?.role}
            </Text>
          </div>
          <DownOutlined className="text-gray-500 text-xs" />
        </div>
      </Dropdown>
    )}
  </div>
</div>


        <ForMobile />
      </div>
    </div>
  );
};

export default Navbar;
