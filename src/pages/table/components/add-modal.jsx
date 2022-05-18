import React from 'react';
import { Modal as AntdModal, Button, Form, Input, Tag, Select, message } from 'antd';
import { addUser } from '@/services/ant-design-pro/api';
import { useEffect } from 'react';
import { values } from 'lodash';
import { useAccess, Access } from 'umi';
import { render } from 'react-dom';

const Modal = ({ modalVisible, hideModal, reloadData }) => {
  const [form] = Form.useForm();
  const access = useAccess();
  console.log(access);

  useEffect(() => {
    form.resetFields();
    reloadData();
  }, [modalVisible]);
  //添加新用户
  const handlerAddUser = () => {
    //获取表单所有的输入
    form
      .validateFields()
      .then((values) => {
        addUserInfo(values);
      })
      .catch((info) => {
        console.log(info);
      });
  };

  const addUserInfo = async (values) => {
    const data = form.getFieldsValue();
    const msg = await addUser(data);
    if (msg) {
      if (msg.success) {
        hideModal();
        message.success(msg.message);
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
                min: 6,
                message: '长度在需大于6个字符',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
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
            <Access accessible={access.canSuperAdmin}>
              <Select>
                <Select.Option value="2">管理员</Select.Option>
                <Select.Option value="3">普通用户</Select.Option>
              </Select>
            </Access>
            <Access accessible={access.canOnlyAdmin}>
              <Select>
                <Select.Option value="3">普通用户</Select.Option>
              </Select>
            </Access>
          </Form.Item>
        </Form>
      </AntdModal>
    </div>
  );
};

export default Modal;
