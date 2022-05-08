import React from 'react';
import { Table, Tag, Space } from 'antd';
import moment from 'moment';

const DustInfoTable = () => {
  const columns = [
    {
      title: '粉尘浓度(m^3)',
      dataIndex: 'dust',
      key: 'dust',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '位置',
      dataIndex: 'local',
      key: 'local',
    },
    {
      title: '预警等级',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === '严重') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    },
  ];
  const getNowDate = () => {
    let time = moment().format('YYYY-MM-DD HH:mm:ss');
    return time;
  };

  const data = [
    {
      dust: '10mg',
      local: '一号矿井',
      level: '一级',
      tags: ['严重'],
      time: getNowDate(),
    },
    {
      dust: '1000mg',
      local: '二号矿井',
      level: '一级',
      tags: ['严重'],
      time: '2022-04-25 11:58:59',
    },
    {
      dust: '10mg',
      local: '三号矿井',
      level: '三级',
      tags: ['优良'],
      time: getNowDate(),
    },
  ];
  return <Table columns={columns} dataSource={data} />;
};
export default DustInfoTable;
