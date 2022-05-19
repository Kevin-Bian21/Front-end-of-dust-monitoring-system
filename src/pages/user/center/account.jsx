import {
  Card,
  Image,
  Divider,
  Form,
  Input,
  Button,
  Upload,
  message,
  Tooltip,
  Row,
  Col,
  Space,
} from 'antd';
import { InfoCircleOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import UpdatePasswordModal from './components/updatePasswordModal';
import { getPersonalDetails, updatePersonalInfo, currentUser } from '@/services/ant-design-pro/api';
import { useModel } from 'umi';
import { getInitialState } from '@/app';

export default () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data] = useState();
  const { initialState, setInitialState } = useModel('@@initialState');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const initData = await getPersonalDetails();
    if (initData?.success === 'ok') {
      form.setFieldsValue(initData.data);
      setImageUrl(initData.data?.avatar);
    } else {
      setData(null);
      message.error(initData?.message);
    }
  }
  // console.log(data);

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('请上传 JPG/PNG 类型的图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小超过 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        setLoading(false);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const onFinish = async (value) => {
    const msg = await updatePersonalInfo(value);
    if (msg?.success == 'ok') {
      fetchData();
      message.success(msg.message);
    } else {
      message.error(msg.message);
    }
  };

  return (
    <Row>
      <Col span={9} />

      <Col span={6}>
        <Card>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <Tooltip placement="right" title="上传头像" color="lime">
                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
              </Tooltip>
            ) : (
              uploadButton
            )}
          </Upload>
          <Divider />
          <Form form={form} layout="vertical" wrapperCol={{ span: 22 }} onFinish={onFinish}>
            <Form.Item label="登录账户" name="loginAccount">
              <Input disabled="true" />
            </Form.Item>
            <Form.Item
              label="姓名"
              required
              name="userName"
              rules={[
                {
                  required: true,
                  message: '请输入姓名',
                },
                { len: '50', message: '输入的名称太长！' },
              ]}
            >
              <Input placeholder="请输入姓名" />
            </Form.Item>
            <Form.Item
              label="电话"
              required
              name="phone"
              rules={[
                {
                  pattern: new RegExp(
                    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                  ),
                  message: '请输入正确的手机号码',
                },
              ]}
            >
              <Input placeholder="请输入电话" />
            </Form.Item>
            <Form.Item
              label="邮箱"
              name="email"
              allowClear
              rules={[
                {
                  type: 'email',
                  message: '请输入正确的电子邮箱',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="密码" name="pwd" initialValue="************">
              <Input disabled="true" />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  更新
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    setIsModalVisible(true);
                  }}
                >
                  修改密码
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
        <UpdatePasswordModal
          isModalVisible={isModalVisible}
          hideModal={() => {
            setIsModalVisible(false);
          }}
        />
        <Col span={9} />
      </Col>
    </Row>
  );
};
