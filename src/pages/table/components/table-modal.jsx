import React from 'react';
import { Modal as AntdModal, Button, Form, Input, Tag, Select, message } from 'antd';
import { addUser } from '@/services/ant-design-pro/api';

const Modal = ({ modalVisible, hideModal }) => {
  const [form] = Form.useForm();

  //添加新用户
  const handlerAddUser = async () => {
    //获取表单所有的输入
    const data = form.getFieldsValue();
    const msg = await addUser(data);
    if (msg) {
      if (msg.success) {
        message.success(msg.message);
        hideModal();
      } else {
        message.error(msg.message);
      }
    }
  };

  return (
    <div>
      <AntdModal title="添加用户" visible={modalVisible} onCancel={hideModal} onOk={handlerAddUser}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="姓名"
            name="userName"
            wrapperCol={{ span: 10 }}
            allowClear
            rules={[
              {
                required: true,
                message: '请输入姓名',
              },
              { len: '50', message: '输入的名称太长！' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="登录账号"
            name="loginAccount"
            allowClear
            rules={[
              {
                required: true,
                message: '请设置登录的账号',
              },
              { len: '10', message: '登陆账号长度超过范围！' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="passWord"
            allowClear
            rules={[
              {
                required: true,
                message: '请设置登录密码',
              },
              {
                pattern: new RegExp(/^(?=.*d)(?=.*[a-zA-Z]).{5,20}$/),
                message: '必须包含字母和数字的组合,长度在5-20之间',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="权限"
            name="access"
            rules={[
              {
                required: true,
                message: '请为用户分配权限',
              },
            ]}
          >
            <Select>
              <Select.Option value="2">管理员</Select.Option>
              <Select.Option value="3">普通用户</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </AntdModal>
    </div>
  );
};

export default Modal;
