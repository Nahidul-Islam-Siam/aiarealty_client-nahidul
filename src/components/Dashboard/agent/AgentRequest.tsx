'use client';

import { useState } from "react";
import { useApprovedRejectPartnerMutation,  useGetPartnersQuery } from "@/redux/service/allPartner/allPartnerApi";
import { Dropdown, Menu, Spin } from "antd";
import Link from "next/link"; // Import Link from Next.js
import { toast } from "sonner"; // Import toast for notifications

export default function AgentRequest({ page }: { page?: string }) {
  const [approvedRejectPartner] = useApprovedRejectPartnerMutation();
  
  // Handle the approve/reject action
  const { data, isLoading,refetch } = useGetPartnersQuery({
    role: "AGENT", // Role filter only
  });

  const handleApprovalStatusChange = async (id: string, status: string) => {
    try {
      const res = await approvedRejectPartner({ id, action: status }).unwrap(); // Pass payload with action

      if (res && res.message) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message || "Failed to change status");
      }

      refetch(); // Refetch data after updating status
    } catch (error) {
      console.error("Error changing approval status:", error);
      toast.error("An error occurred while changing status.");
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  const agents = data?.data?.data || [];

  // Filter agents with approvalStatus "PENDING" or null (since none are "PENDING", this filters nulls)
  const filteredAgents = agents.filter(
    (agent) => agent.approvalStatus === "PENDING"
  );

  // Apply search filter on agent names
  const filteredAgentsBySearch = filteredAgents.filter((agent) =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const actionMenu = (agentId: string) => (
    <Menu>
            <Menu.Item key="1">
    
         <button
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => handleApprovalStatusChange(agentId, "APPROVED")}
                            >  Approve</button>
      </Menu.Item>
      <Menu.Item key="2">
    
        <button
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          onClick={() => handleApprovalStatusChange(agentId, "REJECTED")}
        >
          Remove
        </button>
      </Menu.Item>
      <Menu.Item key="2">
        <Link href={`/dashboard/all-agent/${agentId}`} passHref>
          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            Details
          </button>
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="bg-white p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search Here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
        <button
          onClick={() => refetch()}
          className="ml-4 bg-yellow-400 text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
        >
          Refresh
        </button>
      </div>

      {page !== "agents" && (
        <>
          <div className="max-w-3xl 2xl:max-w-xl mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {filteredAgentsBySearch?.length || 0}
                  </div>
                  <div className="text-gray-600 text-sm">Total Pending Agents</div>
                </div>
                <div className="text-gray-400">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-1.1.9-2 2-2s2 .9 2 2V18h2v-4h3v4h1v2H3v-2h1zm8-13.5c0-.83-.67-1.5-1.5-1.5S9 3.67 9 4.5 9.67 6 10.5 6s1.5-.67 1.5-1.5z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Orders Table */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-white border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Agent Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Agent ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Company Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Country</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAgentsBySearch.length > 0 ? (
                filteredAgentsBySearch.map((agent, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm text-gray-900">{agent.name}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{agent.id}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{agent.profile?.company || "N/A"}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{agent.email}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{agent.profile?.phone || "N/A"}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{agent.profile?.country || "N/A"}</td>
                    <td className="px-4 py-4 text-right">
                      <Dropdown overlay={() => actionMenu(agent.id)} trigger={['click']}>
                        <button className="p-1 rounded-full hover:bg-gray-100 focus:outline-none">
                          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400">
                            <circle cx="5" cy="12" r="2" />
                            <circle cx="12" cy="12" r="2" />
                            <circle cx="19" cy="12" r="2" />
                          </svg>
                        </button>
                      </Dropdown>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center text-gray-500 py-4">No Pending Agents</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white px-6 py-3 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 text-sm rounded ${currentPage === page ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"}`}
            >
              {page}
            </button>
          ))}

          <button className="p-2 text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
