import React, { useEffect } from 'react';
import { Modal as AntdModal, Button, Form, Input, Tag, Select, message } from 'antd';
import { updateUser } from '@/services/ant-design-pro/api';
import { useAccess, Access } from 'umi';

const EditModal = ({ modalVisible, hideModal, record, reloadData }) => {
  const [form] = Form.useForm();
  const access = useAccess();

  useEffect(() => {
    form.resetFields();
    reloadData();
  }, [modalVisible]);

  //添加新用户
  const handlerUpdateUser = () => {
    //校验表单成功后调用接口
    form
      .validateFields()
      .then((values) => {
        updateUserInfo(values);
      })
      .catch((info) => {
        console.log(info);
      });
  };

  const updateUserInfo = async (values) => {
    const msg = await updateUser(values);
    if (msg) {
      if (msg.success === 'ok') {
        hideModal();
        message.success(msg.message);
      } else {
        message.error(msg.message);
      }
    }
  };

  return (
    <div>
      <AntdModal
        title="修改信息"
        visible={modalVisible}
        onCancel={hideModal}
        onOk={handlerUpdateUser}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={record}
        >
          <Form.Item name="userId" allowClear hidden>
            <Input />
          </Form.Item>
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
                message: '密码长度需大于6个字符',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="电话"
            name="phone"
            allowClear
            rules={[
              {
                pattern: new RegExp(
                  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                ),
                message: '请输入正确的手机号码',
              },
            ]}
          >
            <Input />
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

export default EditModal;
