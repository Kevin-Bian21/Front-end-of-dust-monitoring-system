import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Liquid } from '@ant-design/plots';
import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import Styles from './dust-chart.less';

const DemoLiquid = () => {
  const config = {
    percent: 0.25,
    outline: {
      border: 4,
      distance: 6,
    },
    wave: {
      length: 100,
    },
    color: '#52c41a',
  };
  return <Liquid {...config} />;
};

const StatisticData = () => (
  <div style={{ height: 50 }}>
    <Row>
      <Col span={12}>
        <Card>
          <Statistic
            title="Active"
            value={11.2}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <Statistic
            title="Idle"
            value={9.3}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
    </Row>
  </div>
);

const MonitorCard = () => (
  <div className={Styles.cardwrapper}>
    <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
      <Col span={4}>
        <Card
          title="设备运行状况"
          bordered={false}
          hoverable={true}
          size={'small'}
          //style={{ width: 200, height: 200 }}
        >
          <div style={{ height: 140 }}>
            <DemoLiquid />
          </div>
        </Card>
      </Col>
      <Col span={8}>
        <Card
          title="预警次数"
          bordered={false}
          hoverable={true}
          size={'small'}
          //style={{ width: 200, height: 200 }}
        >
          <div style={{ height: 140 }}>
            <StatisticData />
          </div>
        </Card>
      </Col>
    </Row>
  </div>
);

export default MonitorCard;
