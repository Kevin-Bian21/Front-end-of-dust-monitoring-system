import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Line } from '@ant-design/plots';
import { Table, Tag, Space, Pagination, Row, Col, Card, Tooltip } from 'antd';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { history } from 'umi';

const DemoLine = () => {
  console.log(history.location);

  const params = history.location.state;
  const lineTitle = params + '24小时内数据变化折线图';

  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config = {
    data,
    padding: 'auto',
    xField: 'year',
    yField: 'value',
    seriesField: 'category',
    annotations: [
      // 低于中位数颜色变化
      {
        type: 'regionFilter',
        start: ['min', 'median'],
        end: ['max', '0'],
        color: '#F4664A',
      },
      {
        type: 'text',
        position: ['min', 'median'],
        content: '中位数',
        offsetY: -4,
        style: {
          textBaseline: 'bottom',
        },
      },
      {
        type: 'line',
        start: ['min', 'median'],
        end: ['max', 'median'],
        style: {
          stroke: '#F4664A',
          lineDash: [2, 2],
        },
      },
    ],
  };

  return (
    <PageContainer>
      <Card
        title={lineTitle}
        headStyle={{ color: '#3f3f3f', textAlign: 'center', fontWeight: 'bolder' }}
      >
        <Line {...config} />
      </Card>
    </PageContainer>
  );
};
export default DemoLine;
