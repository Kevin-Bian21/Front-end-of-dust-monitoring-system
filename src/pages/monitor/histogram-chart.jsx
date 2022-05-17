import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';
import { Card } from 'antd';
import { history } from 'umi';

const HistogramChart = (props) => {
  const data = props.histogramData || [];
  const limitValue = props.limitValue || [];

  const config = {
    data,
    height: 245,
    isGroup: 'true',
    xField: 'local',
    yField: 'value',
    seriesField: 'type',
    // 分组柱状图 组内柱子间的间距 (像素级别)
    dodgePadding: 2,
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'middle', 'bottom'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: 'interval-adjust-position',
        }, // 数据标签防遮挡
        {
          type: 'interval-hide-overlap',
        }, // 数据标签文颜色自动调整
        {
          type: 'adjust-color',
        },
      ],
    },
  };

  // plot 添加点击事件,整个图表区域
  const onShowLineChart = (plot) => {
    plot.on('element:click', (...args) => {
      const local = args[0].data?.data?.local;
      history.push({
        pathname: `/monitor/lineChartWithIn24h`,
        state: local,
        query: { limitValue },
      });
    });
  };

  return <Column {...config} onReady={onShowLineChart} />;
};
export default HistogramChart;
