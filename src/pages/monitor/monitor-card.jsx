import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Liquid } from '@ant-design/plots';
import { Statistic, Card, Row, Col, Switch, notification, Select, message } from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  CloseOutlined,
  CheckOutlined,
  SoundTwoTone,
} from '@ant-design/icons';
import Styles from './dust-chart.less';
import DeviceMap from './device-map';
import CloseDevice from './components/close-device';
import StateDevice from './components/state-device';
import MonitorVideo from './video/monitor-video';
import { getMonitorVideoSrc } from '@/services/ant-design-pro/api';

const MonitorCard = () => {
  const [monitorVideoSrc, setMonitorVideoSrc] = useState(
    'https://bianwenkai.oss-cn-beijing.aliyuncs.com/video/monitor-video.mp4',
  );
  const [selectLocal, setSelectLocal] = useState(null);
  const [localValue, setLocalValue] = useState(null);

  //解决seletLocal赋值不能及时生效导致监控视频无法和下拉选择框选择的监测点相匹配的问题
  useEffect(() => {
    fun();
  }, [selectLocal]);

  async function fun() {
    setLocalValue(Math.random());
  }

  const onChange = (value) => {
    if (value == false) {
      setModalVisible(true);
    }
  };
  const [modalVisible, setModalVisible] = useState(false);

  const selectMonitorVideo = async (value) => {
    setSelectLocal(value);
    if (value) {
      const msg = await getMonitorVideoSrc({ local: value });
      if (msg) {
        setMonitorVideoSrc(msg);
        message.success('监控加载成功!');
      } else {
        message.error('监控加载失败!');
      }
    }
  };

  return (
    <div>
      <div className={Styles.cardwrapper}>
        <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
          <Col span={24}>
            <Card
              title="粉尘喷雾部署图"
              bordered={false}
              // hoverable={true}
              // size={'small'}
              headStyle={{
                color: '#3f3f3f',
                textAlign: 'center',
                fontWeight: 'bolder',
              }}
              // loading="true"
              style={{
                height: 525,
              }}
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
              title="监测点监控视频"
              bordered={false}
              size={'small'}
              extra={
                <Select style={{ width: 120 }} onChange={selectMonitorVideo}>
                  <Select.Option value="1">一号监测点</Select.Option>
                  <Select.Option value="2">二号监测点</Select.Option>
                  <Select.Option value="3">三号监测点</Select.Option>
                  <Select.Option value="4">四号监测点</Select.Option>
                  <Select.Option value="5">五号监测点</Select.Option>
                  <Select.Option value="6">六号监测点</Select.Option>
                  <Select.Option value="7">七号监测点</Select.Option>
                </Select>
              }
            >
              <MonitorVideo
                video_url={monitorVideoSrc}
                // onReady={(play) => {
                //   // console.log('play====', play);
                //   play.play();
                // }}

                selectLocal={localValue}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MonitorCard;
