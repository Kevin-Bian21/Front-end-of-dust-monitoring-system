import React from 'react';
import { Table, Tag, Space, Button, Input, Form, Tooltip, Row, Col, Card, message } from 'antd';
import moment from 'moment';
import { useRequest } from 'umi';
import { getEnvData } from '@/services/ant-design-pro/api';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import HistogramChart from './histogram-chart';
import Styles from './dust-chart.less';
import { createWebSocket, closeWebSocket, notificationInfo, sendMessage } from './websocket';
import { PubSub } from 'pubsub-js';

class DustInfoTable extends React.Component {
  constructor() {
    super();
  }

  state = {
    data: [],
    columns: [],
  };

  onFinish = async (limitValue) => {
    //将用户上一次设置的值保存下来，然后用该预警值去每10秒请求一次后端接口

    // //用户提交了数据后就通过socket传到后端
    console.log(limitValue);
    const limit = JSON.stringify(limitValue);
    console.log(limit);
    localStorage.setItem('limitValue', limit);
    sendMessage(localStorage.getItem('limitValue'));

    const envData = await getEnvData(JSON.parse(localStorage.getItem('limitValue')));
    if (envData) {
      this.setState({ data: envData?.data });
      console.log(envData);
    }
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  componentDidMount = () => {
    let socketURL = `ws://localhost:8080/ws/${localStorage.getItem('token')}`;
    createWebSocket(socketURL);
    notificationInfo('success', 'WebSocket', 'webSocket连接成功,每10秒推送一次最新数据', 3);
    PubSub.subscribe('dataSource', (name, context) => {
      console.log('订阅者', context);
      this.setState({ data: context });
    });
    window.onbeforeunload = function () {
      closeWebSocket();
      PubSub.unsubscribe(this.state.data);
      notificationInfo('warning', 'WebSocket', 'webSocket断开连接', 3);
    };

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
                  {tag}
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

    this.setState({ columns: columns });

    const getNowDate = () => {
      let time = moment().format('YYYY-MM-DD HH:mm:ss');
      return time;
    };

    const init = async () => {
      const initData = await getEnvData({});
      console.log('dsafdafewqre', initData);

      this.setState({ data: initData?.data });
    };

    init();
  };

  componentWillUnmount() {
    closeWebSocket();
    PubSub.unsubscribe('dataSource');
    notificationInfo('warning', 'WebSocket', 'webSocket断开连接', 3);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   let _this = this;
  //   _this.state.data = PubSub.subscribe('data', function (topic, message) {
  //     // _this.handleWarningMessage(message);
  //   });
  // }

  render() {
    return (
      <div>
        <div
          style={{ paddingTop: 15, paddingLeft: 10, paddingBottom: 15, backgroundColor: '#ffffff' }}
        >
          <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
            <Col span={24}>
              <Form
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
              >
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
              <Table
                columns={this.state.columns}
                dataSource={this.state.data[0]}
                pagination={false}
                size="small"
              />
            </Col>
          </Row>
        </div>
        <div style={{ paddingTop: 10 }}>
          <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
            <Col span={24}>
              <div>
                <Card
                  title="当前环境各监测点粉尘浓度直方图"
                  size={'small'}
                  headStyle={{ textAlign: 'center' }}
                  // loading="true"
                >
                  <HistogramChart histogramData={this.state.data[1]} />
                </Card>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default DustInfoTable;
