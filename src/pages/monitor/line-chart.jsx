import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Line } from '@ant-design/plots';
import { Table, Tag, Space, Pagination, Row, Col, Card, Tooltip } from 'antd';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { history } from 'umi';
import ReactEcharts from 'echarts-for-react';

const DemoLine = () => {
  console.log(history.location);

  const params = history.location.state;
  const lineTitle = params + '24小时内数据变化折线图';

  const [data, setData] = useState([]);

  const [sales, setSales] = useState([5, 20, 36, 10, 10, 20]);
  const [stores, setStores] = useState([15, 120, 36, 110, 110, 20]);

  const getOption = (sal, sto) => {
    return {
      title: {
        text: 'ECharts 入门示例',
      },
      tooltip: {},
      legend: {
        data: ['销量', '库存'],
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'line',
          data: sales,
        },
        {
          name: '库存',
          type: 'line',
          data: stores,
        },
      ],
    };
  };

  return (
    <PageContainer>
      <Card
        title={lineTitle}
        headStyle={{ color: '#3f3f3f', textAlign: 'center', fontWeight: 'bolder' }}
      >
        <ReactEcharts option={getOption(sales, stores)} />
      </Card>
    </PageContainer>
  );
};
export default DemoLine;
