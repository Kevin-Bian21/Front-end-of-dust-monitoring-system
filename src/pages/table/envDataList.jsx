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
  Select,
} from 'antd';
import { ExclamationCircleOutlined, ReconciliationFilled, SearchOutlined } from '@ant-design/icons';
import { useRequest, useAccess, Access } from 'umi';
import styles from './tableList.less';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { useToggle, useUpdateEffect } from 'ahooks';
import moment from 'moment';
import QueueAnim from 'rc-queue-anim';
import { getAllMonitorData } from '@/services/ant-design-pro/api';
import ExportExcel from 'js-export-excel';
import { ExportOutlined } from '@ant-design/icons';
import { downloadExcel } from './builder/downloadData';

const EnvDataList = () => {
  const [data, setData] = useState([]);
  const [searchForm] = Form.useForm();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [resetDate, setResetDate] = useState(new Date());
  const [moitorLocal, setMonitorLocal] = useState(null);
  const access = useAccess();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [page, limit, moitorLocal, endDateTime]);

  async function fetchData() {
    const values = {
      searchMessage: moitorLocal,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      page: page,
      limit: limit,
    };
    const initData = await getAllMonitorData(values);
    setData(initData);
  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
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
        multiple: 4, //多列排序优先级为最高
      },
    },
    {
      title: '风速(m/s)',
      dataIndex: 'windSpeed',
      key: 'windSpeed',
      sorter: {
        compare: (a, b) => a.windSpeed - b.windSpeed,
        multiple: 5, //多列排序优先级为最高
      },
    },
    {
      title: '监测时间',
      dataIndex: 'monitorDateTime',
      key: 'monitorDateTime',
      sorter: {
        compare: (a, b) => new Date(a.monitorDateTime) - new Date(b.monitorDateTime),
        multiple: 3, //多列排序优先级为最高
      },
      align: 'center',
    },
    {
      title: '预警等级',
      dataIndex: 'level',
      key: 'level',
      render: (level) => {
        return level == '严重' ? (
          <Tag color="volcano">{level}</Tag>
        ) : (
          <Tag color="green">{level}</Tag>
        );
      },
      align: 'center',
    },
    {
      title: '粉尘浓度预警值',
      dataIndex: 'dustLimit',
      key: 'dustLimit',
    },
    {
      title: '温度预警值',
      dataIndex: 'temperatureLimit',
      key: 'temperatureLimit',
    },
  ];

  const onChange = (value, dateString) => {
    setStartDateTime(dateString[0]);
    setEndDateTime(dateString[1]);
  };

  const onFinish = (value) => {
    if (value && value.monitorLocal) {
      setMonitorLocal(value.monitorLocal);
    }
  };
  //顶部搜索框
  const searchLayout = () => {
    return (
      <QueueAnim type="top">
        <div>
          <Card className={styles.searchForm}>
            <Form form={searchForm} onFinish={onFinish}>
              <Row>
                <Col sm={6}>
                  <Form.Item label="监测位置" name="monitorLocal">
                    <Select>
                      <Select.Option value="一号监测点">一号监测点</Select.Option>
                      <Select.Option value="二号监测点">二号监测点</Select.Option>
                      <Select.Option value="三号监测点">三号监测点</Select.Option>
                      <Select.Option value="四号监测点">四号监测点</Select.Option>
                      <Select.Option value="五号监测点">五号监测点</Select.Option>
                      <Select.Option value="六号监测点">六号监测点</Select.Option>
                      <Select.Option value="七号监测点">七号监测点</Select.Option>
                      <Select.Option value="八号监测点">八号监测点</Select.Option>
                      <Select.Option value="九号监测点">九号监测点</Select.Option>
                      <Select.Option value="十号监测点">十号监测点</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col sm={12}>
                  <Form.Item label="时间范围">
                    <DatePicker.RangePicker
                      showTime
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
                        setResetDate(new Date());
                        setMonitorLocal(null);
                        setStartDateTime(null);
                        setEndDateTime(null);
                      }}
                    >
                      重置
                    </Button>

                    <Access accessible={access.canExportExcel}>
                      <div style={{ paddingLeft: 50 }}>
                        <Button
                          onClick={() => {
                            downloadExcel(data);
                          }}
                        >
                          <ExportOutlined rotate={270} />
                          导出
                        </Button>
                      </div>
                    </Access>
                  </Space>
                </Col>
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
            total={data.length * data.length}
            pageSizeOptions={[10, 50, 100, 500, 1000, 5000]}
          />
        </Col>
      </Row>
    );
  };
  function onShowSizeChange(current, pageSize) {
    setPage(current);
    setLimit(pageSize);
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
