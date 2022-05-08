import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Column, Gauge } from '@ant-design/plots';
import { PageContainer } from '@ant-design/pro-layout';
import { Row, Col, Space, Divider } from 'antd';
import DustInfoTable from './dust-table';
import Histogram from './Histogram';
import Temperature from './temperature';
import DeviceMap from './device-map';
import MonitorCard from './monitor-card';
import WindySpeed from './windy-speed';
import Styles from './dust-chart.less';

const Page = () => {
  //图表布局
  const chartLayout = () => {
    const style = { background: '#fafafa', width: '225px', height: '250px', padding: '8px 0' };
    return (
      <div>
        <MonitorCard />

        <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
          <Col span={12}>
            <div className={Styles.histogramWrapper}>
              <Histogram />
            </div>
          </Col>
          <Col span={12}>
            <div className={Styles.dustInfoTableWrapper}>
              <DustInfoTable />
            </div>
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
              <WindySpeed />
            </div>
          </Col>
          <Col span={4}>
            <div>
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
