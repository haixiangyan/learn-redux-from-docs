import React from 'react'
import {ConfigProvider, Tabs} from "antd"
import ReactReduxTodo from "./apps/ReactReduxTodo"
import zhCN from 'antd/es/locale/zh_CN'
import 'antd/dist/antd.css'

const {TabPane} = Tabs

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="react-redux" key="1">
          <ReactReduxTodo/>
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </ConfigProvider>
  );
}

export default App;
