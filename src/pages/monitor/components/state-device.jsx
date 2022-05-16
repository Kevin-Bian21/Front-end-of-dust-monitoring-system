import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Liquid } from '@ant-design/plots';
import { Statistic, Card, Row, Col, Switch, notification } from 'antd';

const StateDevice = () => {
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

export default StateDevice;
