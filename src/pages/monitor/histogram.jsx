import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';

const Histogram = () => {
  const data = [
    {
      type: '一号矿井',
      value: 80,
    },
    {
      type: '二号矿井',
      value: 50,
    },
    {
      type: '三号矿井',
      value: 185,
    },
    {
      type: '四号矿井',
      value: 57,
    },
    {
      type: '五号矿井',
      value: 108,
    },
    {
      type: '六号矿井',
      value: 73,
    },
    {
      type: '七号矿井',
      value: 193,
    },
    {
      type: '八号矿井',
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
