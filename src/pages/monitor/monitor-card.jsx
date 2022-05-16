import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Liquid } from '@ant-design/plots';
import { Statistic, Card, Row, Col, Switch, notification } from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  CloseOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import Styles from './dust-chart.less';
import DeviceMap from './device-map';
import CloseDevice from './components/close-device';
import StateDevice from './components/state-device';

const MonitorCard = () => {
  const onChange = (value) => {
    if (value == false) {
      setModalVisible(true);
      console.log(value);
    }
  };
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div>
      <div className={Styles.cardwrapper}>
        <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
          <Col span={8}>
            <Card
              title="设备运行状况"
              bordered={false}
              hoverable={true}
              size={'small'}
              //style={{ width: 200, height: 200 }}
            >
              <div style={{ height: 140 }}>
                <StateDevice />
              </div>
            </Card>
          </Col>
          <Col span={16}>
            <Card
              title="预警次数"
              bordered={false}
              hoverable={true}
              size={'small'}
              //style={{ width: 200, height: 200 }}
            >
              <div style={{ height: 140 }}>
                <div style={{ height: 50 }}>
                  <Row>
                    <Col span={12}>
                      <Card>
                        <Statistic
                          title="Active"
                          value={11.2}
                          precision={2}
                          valueStyle={{ color: '#3f8600' }}
                          prefix={<ArrowUpOutlined />}
                          suffix="%"
                        />
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card>
                        <Statistic
                          value={9.3}
                          precision={2}
                          valueStyle={{ color: '#cf1322' }}
                          prefix={<ArrowDownOutlined />}
                          suffix="%"
                        />
                      </Card>
                    </Col>
                  </Row>
                </div>
                ;
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <div className={Styles.cardwrapper}>
        <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
          <Col span={24}>
            <Card
              title="粉尘喷雾部署图"
              bordered={false}
              // hoverable={true}
              // size={'small'}
              headStyle={{ color: '#3f3f3f', textAlign: 'center', fontWeight: 'bolder' }}
              // loading="true"
              style={{ height: 500 }}
              extra={
                <>
                  <Switch
                    checkedChildren="开启"
                    unCheckedChildren="关闭"
                    defaultChecked
                    onChange={onChange}
                  />
                  <CloseDevice
                    modalVisible={modalVisible}
                    hideModal={() => {
                      setModalVisible(false);
                    }}
                  />
                </>
              }
            >
              <div style={{ height: 430 }}>
                <DeviceMap />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MonitorCard;
