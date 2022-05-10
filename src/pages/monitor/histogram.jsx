import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';
import { Card } from 'antd';

const Histogram = () => {
  const data = [
    {
      type: '一号监测点',
      value: 80,
    },
    {
      type: '二号监测点',
      value: 50,
    },
    {
      type: '三号监测点',
      value: 185,
    },
    {
      type: '四号监测点',
      value: 57,
    },
    {
      type: '五号监测点',
      value: 108,
    },
    {
      type: '六号监测点',
      value: 73,
    },
    {
      type: '七号监测点',
      value: 193,
    },
    {
      type: '八号监测点',
      value: 32,
    },
  ];
  const paletteSemanticRed = '#F4664A';
  const brandColor = '#5B8FF9';
  const config = {
    height: 250,
    data,
    xField: 'type',
    yField: 'value',
    //配置柱状图颜色时使用的条件
    seriesField: 'value',
    label: {
      content: (originData) => {
        const val = parseFloat(originData.value);
        //        console.log(originData);
        if (val < 0.05) {
          return (val * 100).toFixed(1) + '%';
        }
      },
      offset: 10,
    },
    color: ({ value }) => {
      //      console.log(value);
      if (value > 150) {
        return paletteSemanticRed;
      }

      return brandColor;
    },
    legend: false,
    xAxis: {
      label: {
        autoHide: false,
        autoRotate: false,
      },
    },
  };
  return <Column {...config} />;
};
export default Histogram;
