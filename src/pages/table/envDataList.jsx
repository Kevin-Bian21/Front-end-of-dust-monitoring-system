import React, { useEffect, useState } from 'react';
import {
  Table,
  Tag,
  Space,
  Pagination,
  Button,
  Row,
  Col,
  Card,
  Modal as AntdModal,
  Tooltip,
  Form,
  InputNumber,
  Input,
  DatePicker,
  message,
} from 'antd';
import { ExclamationCircleOutlined, ReconciliationFilled, SearchOutlined } from '@ant-design/icons';
import { useRequest } from 'umi';
import styles from './tableList.less';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { useToggle, useUpdateEffect } from 'ahooks';
import moment from 'moment';
import QueueAnim from 'rc-queue-anim';

//import SearchBuilder from './builder/searchBuilder';

const EnvDataList = () => {
  useEffect(() => {
    // fetchData();
  }, []);

  const [data, setData] = useState([]);
  const [searchForm] = Form.useForm();
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [resetDate, setResetDate] = useState(new Date());

  const columns = [
    {
      title: '监测位置',
      dataIndex: 'monitorLocal',
      key: 'monitorLocal',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '粉尘浓度(g/m³)',
      dataIndex: 'dustDensity',
      key: 'dustDensity',
      sorter: {
        compare: (a, b) => a.dustDensity - b.dustDensity,
        multiple: 1, //多列排序优先级为最高
      },
    },
    {
      title: '温度(℃)',
      dataIndex: 'temperature',
      key: 'temperature',
      sorter: {
        compare: (a, b) => a.temperature - b.temperature,
        multiple: 2, //多列排序优先级为最高
      },
    },
    {
      title: '湿度(%)',
      dataIndex: 'humidity',
      key: 'humidity',
      sorter: {
        compare: (a, b) => a.humidity - b.humidity,
        multiple: 3, //多列排序优先级为最高
      },
    },
    {
      title: '风速(m/s)',
      dataIndex: 'windSpeed',
      key: 'windSpeed',
      sorter: {
        compare: (a, b) => a.windSpeed - b.windSpeed,
        multiple: 4, //多列排序优先级为最高
      },
    },
    {
      title: '监测时间',
      dataIndex: 'monitorDateTime',
      key: 'monitorDateTime',
      sorter: {
        compare: (a, b) => new Date(a.monitorDateTime) - new Date(b.monitorDateTime),
        multiple: 5, //多列排序优先级为最高
      },
      align: 'center',
    },
  ];

  const onChange = (value, dateString) => {
    setStartDateTime(dateString[0]);
    setEndDateTime(dateString[1]);
  };

  //顶部搜索框
  const searchLayout = () => {
    return (
      <QueueAnim type="top">
        <div>
          <Card className={styles.searchForm}>
            <Form form={searchForm}>
              <Row>
                <Col sm={6}>
                  <Form.Item
                    label="全表搜索"
                    name="searchMessage"
                    rules={[{ required: false, message: 'Please input your username!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={12}>
                  <Form.Item label="创建时间">
                    <DatePicker.RangePicker
                      // showTime
                      style={{ width: '100%' }}
                      onChange={onChange}
                      key={resetDate}
                      ranges={{
                        Today: [moment().startOf('day'), moment().endOf('day')],
                        'Last 7 Days': [moment().subtract(7, 'd'), moment()],
                        'Last 30 Days': [moment().subtract(30, 'days'), moment()],
                        'Last Month': [
                          moment().subtract(1, 'months').startOf('month'),
                          moment().subtract(1, 'months').endOf('month'),
                        ],
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col sm={1} />
                <Col sm={4}>
                  <Space>
                    <Button type="primary" htmlType="submit">
                      搜索
                    </Button>
                    <Button
                      onClick={() => {
                        searchForm.resetFields();
                        setSelectedRowKeys([]);
                        setSelectedRows([]);
                        setResetDate(new Date());
                        setSearchMessage(null);
                        setStartDateTime(null);
                        setEndDateTime(null);
                      }}
                    >
                      重置
                    </Button>
                  </Space>
                </Col>

                {/* {SearchBuilder(columns)} */}
              </Row>
            </Form>
          </Card>
        </div>
      </QueueAnim>
    );
  };

  const afterTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolbar}>
          <Pagination
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
            onChange={onShowSizeChange}
            hideOnSinglePage={false}
            total={2 * data.length}
          />
        </Col>
      </Row>
    );
  };
  function onShowSizeChange(current, pageSize) {
    setPage(current);
    setLimit(pageSize);
    // fetchData();
    console.log(current, pageSize);
  }

  return (
    <PageContainer>
      {searchLayout()}
      <Card>
        <Table
          rowKey="userId"
          dataSource={data}
          columns={columns}
          pagination={false}
          loading="true"
        />
        {afterTableLayout()}
      </Card>
    </PageContainer>
  );
};
export default EnvDataList;
