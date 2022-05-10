import React from 'react';
import { Table, Tag, Space, Button } from 'antd';
import moment from 'moment';
import { useRequest } from 'umi';
import { getEnvData } from '@/services/ant-design-pro/api';

const DustInfoTable = () => {
  const init = useRequest('/api/presentEnvData');
  console.log(init);

  const columns = [
    {
      title: '粉尘浓度(g/m³)',
      dataIndex: 'dustDensity',
      key: 'dustDensity',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '监测位置',
      dataIndex: 'monitorLocal',
      key: 'monitorLocal',
    },

    {
      title: '温度(℃)',
      dataIndex: 'temperature',
      key: 'temperature',
    },
    {
      title: '湿度(%)',
      dataIndex: 'humidity',
      key: 'humidity',
    },
    {
      title: '风速(%)',
      dataIndex: 'windSpeed',
      key: 'windSpeed',
    },
    {
      title: '预警等级',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags) => (
        <>
          {(tags || []).map((tag) => {
            let color = 'green';
            if (tag === '严重') {
              color = 'volcano';
            }
            if (tag === '良好') {
              color = 'blue';
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
      title: '监测时间',
      dataIndex: 'monitorDateTime',
      key: 'monitorDateTime',
    },
  ];
  const getNowDate = () => {
    let time = moment().format('YYYY-MM-DD HH:mm:ss');
    return time;
  };

  return (
    <div>
      <Button type="primary">提交</Button>
      <Table
        columns={columns}
        dataSource={init?.data}
        pagination={false}
        size="small"
        sortDirections="descend"
      />
    </div>
  );
};
export default DustInfoTable;
