import DashboardCard from "@/components/Dashboard/home/DashboardCards";
import PropertiesMap from "@/components/Dashboard/home/PropertiesMap";
import React from "react";

const DashbaordPage = () => {
  return (
    <section className="">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-md">Welcome to <span className="font-semibold">Aiarealty</span> Property Admin</p>
      </div>
      <DashboardCard/>
      <PropertiesMap/>
    </section>
  )
};

export default DashbaordPage;
