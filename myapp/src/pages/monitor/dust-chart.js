import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Column, Gauge } from '@ant-design/plots';
import { PageContainer } from '@ant-design/pro-layout';
import { Row, Col, Space, Divider } from 'antd';
import DustInfoTable from './dust-table';
import Histogram from './Histogram';
import Temperature from './temperature';
import DeviceMap from './device-map';

const Page = () => {
  //图表布局
  const chartLayout = () => {
    const style = { background: '#fafafa', width: '225px', height: '250px', padding: '8px 0' };
    return (
      <div>
        <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
          <Col span={12}>
            <Histogram />
          </Col>
          <Col span={12}>
            <DustInfoTable />
          </Col>
        </Row>
        <Divider orientation="left">温度湿度监测区</Divider>
        <Row justify="start" gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
          <Col span={4}>
            <div style={style}>
              <Temperature />
            </div>
          </Col>
          <Col span={4}>
            <div style={style}>
              <Temperature />
            </div>
          </Col>
          <Col span={4}>
            <div style={style}>
              <DeviceMap />
            </div>
          </Col>
        </Row>
      </div>
    );
  };
  return <PageContainer>{chartLayout()}</PageContainer>;
};
export default Page;
