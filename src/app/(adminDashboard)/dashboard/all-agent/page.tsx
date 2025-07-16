import AllAgent from '@/components/Dashboard/agent/AllAgent'
import AgentSearchAndRefresh from '@/components/Dashboard/shared/AgentSearchAndRefresh'
import DashboardCommonHeader from '@/components/Dashboard/shared/DashboardCommonHeader'
import Pagination from '@/components/Dashboard/shared/Pagination'
import React from 'react'

export default function page() {
  return (
     <div>
          <DashboardCommonHeader title='Agent List'/>
          <AgentSearchAndRefresh/>
          <AllAgent/>
          <Pagination/>
        </div>
  )
}
