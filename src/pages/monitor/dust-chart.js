import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Column, Gauge } from '@ant-design/plots';
import { PageContainer } from '@ant-design/pro-layout';
import { Row, Col, Space, Divider, Card } from 'antd';
import DustInfoTable from './dust-table';
import HistogramChart from './histogram-chart';
import Temperature from './temperature';
import DeviceMap from './device-map';
import MonitorCard from './monitor-card';
import WindySpeed from './windy-speed';
import Styles from './dust-chart.less';

const Page = () => {
  //图表布局
  const DemoBox = (props) => <p className={`height-${props.value}`}>{props.children}</p>;
  const chartLayout = () => {
    const style = { background: '#fafafa', width: '225px', height: '250px', padding: '8px 0' };
    return (
      <div>
        <Row align="top" gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
          <Col span={12}>
            <DemoBox value={180}>
              <MonitorCard />
            </DemoBox>
          </Col>
          <Col span={12}>
            <DemoBox value={150}>
              <DustInfoTable />
            </DemoBox>
          </Col>
        </Row>
      </div>
    );
  };
  return <PageContainer>{chartLayout()}</PageContainer>;
};
export default Page;
