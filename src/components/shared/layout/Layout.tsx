"use client";

import React, { ReactNode, useState } from "react";
import logo from "@/assets/logo/logo.png";
import { MenuOutlined, DownOutlined,} from "@ant-design/icons";
import { Layout, Menu,  Dropdown, Avatar, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/features/auth";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";

   interface MenuItem {
  key: React.Key;
  label: ReactNode;
  href?: string; 
  icon?: ReactNode; 
  children?: MenuItem[]; 
}






const { Header, Content, Sider } = Layout;
const { Text } = Typography;


const AdminLayout: React.FC<{ children: ReactNode; menu: MenuItem[] }> = ({ children, menu }) => {
const router = useRouter();
  const sign = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);

  const [selectedKey, setSelectedKey] = useState("/dashboard");

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const handleClick = ({ key }: { key: string }) => {
    setSelectedKey(key);
  };

  const avatarMenuItems = [
  {
    key: "profile",
    label: (
      <Link href="/profile">
        <Text strong>View Profile</Text>
      </Link>
    ),
  },
  {
    key: "dashboard",
    label: (
      <Link href="/dashboard">
        <Text strong>Agent Dashboard</Text>
      </Link>
    ),
  },
  {
    type: "divider" as const,
  },
  {
    key: "listings",
    label: (
      <Link href="/my-listings">
        <Text strong>My Listings</Text>
      </Link>
    ),
  },
  {
    key: "clients",
    label: (
      <Link href="/clients">
        <Text strong>My Clients</Text>
      </Link>
    ),
  },
  {
    type: "divider" as const,
  },
  {
    key: "logout",
    label: (
      <Text onClick={handleLogout} strong style={{ color: "#ff4d4f" }}>
        Log Out
      </Text>
    ),
  },
];

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        width={220}
        className={`!bg-[#ffffff] !overflow-y-auto !fixed lg:!static h-full z-50 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        theme="dark"
        collapsed={false}
      >
        <Link href={"/"} className="flex justify-center items-center py-3 border-b border-[#ffffff1a]">
          <Image className="w-[200px] my-5" width={130} height={400} src={logo} alt="logo" />
        </Link>

        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleClick}
          items={menu}
          style={{
            backgroundColor: "#ffffff",
            fontWeight: "500",
          }}
          inlineIndent={16}
          rootClassName="custom-sidebar"
          className="space-y-2"
        />
      </Sider>

      <Layout>
<Header
  style={{
    padding: "",               // Consistent padding shorthand

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",                   // Allows items to wrap on small screens
    rowGap: "12px",                     // Vertical spacing when wrapped
    marginBottom: "24px",              // Use margin here (not Tailwind mt/mb)
  }}
    className="bg-white shadow-sm" // Tailwind background and optional shadow
>
  {/* Heading - Hidden on xs, responsive on larger screens */}
  <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold hidden sm:block w-full sm:w-auto">
    Welcome back!
  </h2>

  {/* Sidebar toggle icon - only visible on mobile */}
  <MenuOutlined
    onClick={() => setOpen(!open)}
    className="block lg:hidden text-xl"
  />

  {/* Avatar and Dropdown */}
  <div className="flex items-center gap-3">
    <Dropdown
      menu={{ items: avatarMenuItems }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <div className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors min-w-[160px]">
        {/* Larger Avatar */}
        <Avatar
          src="https://i.pravatar.cc/150?img=3"
          size={40} // use AntD number size for wider avatar
          className="border-2 border-gray-200"
        />

        {/* Name and role */}
        <div className="flex flex-col leading-tight">
          <Text strong className="text-gray-800 text-xs md:text-[14px]">
            {sign?.name}
          </Text>
          <Text type="secondary" className="text-[11px] md:text-[14ox]">
            {sign?.role}
          </Text>
        </div>

        <DownOutlined className="text-gray-500 text-[10px]" />
      </div>
    </Dropdown>
  </div>
</Header>


        <Content className="!overflow-y-auto !overflow-x-hidden" onClick={() => setOpen(false)} style={{ padding: "24px", height: "100%" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
