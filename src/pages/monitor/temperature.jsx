import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Gauge } from '@ant-design/plots';

const Temperature = () => {
  const ticks = [0, 1 / 3, 2 / 3, 1];
  const color = ['#30BF78', '#FAAD14', '#F4664A'];
  const graphRef = useRef(null);

  const config = {
    percent: 0.45,
    range: {
      ticks: [0, 1],
      color: ['l(0) 0:#30BF78 0.5:#FAAD14 1:#F4664A'],
    },
    indicator: {
      pointer: {
        style: {
          stroke: '#D0D0D0',
        },
      },
      pin: {
        style: {
          stroke: '#D0D0D0',
        },
      },
    },
    statistic: {
      title: {
        formatter: ({ percent }) => {
          if (percent < ticks[1]) {
            return '优';
          }

          if (percent < ticks[2]) {
            return '中';
          }

          return '差';
        },
        style: ({ percent }) => {
          return {
            fontSize: '30px',
            lineHeight: 1,
            color: percent < ticks[1] ? color[0] : percent < ticks[2] ? color[1] : color[2],
          };
        },
      },
      content: {
        offsetY: -40,
        style: {
          fontSize: '24px',
          color: '#6395f9',
        },
        formatter: () => '温度',
      },
    },
    onReady: (plot) => {
      graphRef.current = plot;
    },
  };
  return <Gauge {...config} />;
};

export default Temperature;
