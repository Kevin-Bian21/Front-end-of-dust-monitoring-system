import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Line } from '@ant-design/plots';
import { Table, Tag, Space, Pagination, Row, Col, Card, Tooltip } from 'antd';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { history } from 'umi';
import ReactEcharts from 'echarts-for-react';
import { getDataThroughMonitorLocal } from '@/services/ant-design-pro/api';

const DemoLine = () => {
  useEffect(() => {
    async function fetchData() {
      const params = history.location.state;
      const initData = await getDataThroughMonitorLocal({ local: params });
      setData(initData);
      console.log(initData.dustDensity);
    }
    fetchData();
  }, []);

  const params = history.location.state;

  console.log(history.location);

  const lineTitle = params + '24小时内数据变化折线图';

  const limitValue = localStorage.getItem('limitValue');

  const [data, setData] = useState([]);

  const getOption = (dustDensity, temperature, monitorTime, humidity, windSpeed) => {
    console.log(monitorTime);

    return {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['粉尘浓度', '温度', '湿度', '风速'],
      },

      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      toolbox: {
        show: true,
        feature: {
          dataView: { readOnly: true },
          magicType: { type: ['line', 'bar'] },
          saveAsImage: {},
        },
      },

      xAxis: {
        type: 'category',
        data: monitorTime,
      },

      yAxis: {
        // 纵轴标尺固定
        type: 'value',
        scale: true,
        max: 80,
        min: 0,
        splitNumber: 8,
        boundaryGap: [0.5, 0.5],
      },
      series: [
        {
          name: '粉尘浓度',
          type: 'line',
          data: dustDensity,
          smooth: true,
          markPoint: {
            data: [
              { type: 'max', name: 'Max' },
              { type: 'min', name: 'Min' },
            ],
          },
        },
        {
          name: '温度',
          type: 'line',
          data: temperature,
          smooth: true,
          markPoint: {
            data: [
              { type: 'max', name: 'Max' },
              { type: 'min', name: 'Min' },
            ],
          },
        },
        {
          name: '湿度',
          type: 'line',
          data: humidity,
          smooth: true,
          markPoint: {
            data: [
              { type: 'max', name: 'Max' },
              { type: 'min', name: 'Min' },
            ],
          },
        },
        {
          name: '风速',
          type: 'line',
          data: windSpeed,
          smooth: true,
          markPoint: {
            data: [
              { type: 'max', name: 'Max' },
              { type: 'min', name: 'Min' },
            ],
          },
        },
      ],
    };
  };

  return (
    <PageContainer>
      <Card
        title={lineTitle}
        headStyle={{ color: '#3f3f3f', textAlign: 'center', fontWeight: 'bolder' }}
        style={{ height: 650 }}
      >
        <ReactEcharts
          style={{ height: 550 }}
          option={getOption(
            data.dustDensity,
            data.temperature,
            data.monitorTime,
            data.humidity,
            data.windSpeed,
          )}
        />
      </Card>
    </PageContainer>
  );
};
export default DemoLine;
