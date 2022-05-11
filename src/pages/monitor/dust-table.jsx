import React, { useState } from 'react';
import { Table, Tag, Space, Button, Input, Form, Tooltip } from 'antd';
import moment from 'moment';
import { useRequest } from 'umi';
import { getEnvData } from '@/services/ant-design-pro/api';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const DustInfoTable = () => {
  const [data, setData] = useState([]);
  const [value] = useState({});

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
      title: '风速(m/s)',
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

  const onFinish = async (values) => {
    console.log(values);
    //将用户上一次设置的值保存下来，然后用该预警值去每10秒请求一次后端接口
    Object.assign(value, values);

    const envData = await getEnvData(values);
    if (envData) {
      setData(envData.data);
    }
  };

  //每隔 10s请求一次后端接口获取最新数据
  const timer = setInterval(async () => {
    const envData = await getEnvData(value);
    if (envData) {
      setData(envData.data);
    }
  }, 30000);

  const onFinishFailed = (values) => {};

  return (
    <div>
      <Form initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Space>
          <Form.Item
            label="设置预警值"
            name="dustLimit"
            allowClear
            rules={[
              {
                required: true,
                message: '请输入温度!',
              },
              { pattern: new RegExp(/^[1-9]d*.d*|0.d*[1-9]d*$/), message: '请输入数字!' },
            ]}
          >
            <Input placeholder="粉尘浓度" />
          </Form.Item>
          <Form.Item
            name="temperatureLimit"
            allowClear
            rules={[
              {
                required: true,
                message: '请输入温度!',
              },
              { pattern: new RegExp(/^[1-9]d*.d*|0.d*[1-9]d*$/), message: '请输入数字!' },
            ]}
          >
            <Input placeholder="温度" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button htmlType="submit" type="primary">
                提交
              </Button>
              <Tooltip
                title="默认预警值：粉尘浓度50g,温度30℃"
                color="gray"
                style={{ paddingLeft: 1000 }}
              >
                <ExclamationCircleOutlined />
              </Tooltip>
            </Space>
          </Form.Item>
        </Space>
      </Form>
      <Table columns={columns} dataSource={data} pagination={false} size="small" />
    </div>
  );
};
export default DustInfoTable;
