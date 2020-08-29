import React from 'react'
import {ConfigProvider, Tabs} from "antd"
import ReactReduxTodo from "./apps/ReactReduxTodo"
import zhCN from 'antd/es/locale/zh_CN'
import 'antd/dist/antd.css'
import './apps/styles.scss'

const {TabPane} = Tabs

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="react-redux" key="1">
          <ReactReduxTodo/>
        </TabPane>
        <TabPane tab="redux-toolkit" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </ConfigProvider>
  );
}

export default App;
