import React from 'react'
import { Layout } from 'antd'

import LeftBar from './components/LeftBar'
import TopBar from './components/TopBar'
const {
  Content,
} = Layout


const DashboardLayout = props => {
  return (
    <Layout style={{ width: '100%', height: '100%' }}>
      <TopBar />
      <Layout style={{ width: '100%', height: '100%' }}>
        <LeftBar/>
        <Content style={{ margin: 20, padding: 24, background: '#fff', minHeight: 360 }}>
          {props.component}
        </Content>
      </Layout>
    </Layout>
  )
}

export default DashboardLayout