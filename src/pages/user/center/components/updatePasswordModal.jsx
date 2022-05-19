import React, { useEffect, useState } from 'react';
import { Modal, Button, Input, Form, message, Alert } from 'antd';
import { updatePassword } from '@/services/ant-design-pro/api';

const UpdatePasswordModal = ({ isModalVisible, hideModal }) => {
  useEffect(() => {
    form.resetFields();
  }, [isModalVisible]);

  const [form] = Form.useForm();

  console.log(isModalVisible);

  const handleOk = async () => {
    form
      .validateFields()
      .then((values) => {
        updateUserPassword(values);
      })
      .catch((info) => {
        console.log(info);
      });
  };

  async function updateUserPassword(data) {
    const msg = await updatePassword(data);
    if (msg.success === 'ok') {
      hideModal();
      message.success(msg.message);
    } else {
      message.error(msg.message);
    }
  }

  const handleCancel = () => {
    hideModal();
  };
  const ShowMessage = ({ content }) => (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
  return (
    <div>
      <Modal title="修改密码" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} layout="horizontal">
          <Form.Item
            name="oldPassword"
            label="原密码"
            rules={[
              {
                required: true,
                message: '请输入原密码!',
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
            name="newPassword"
            label="新密码"
            rules={[
              {
                required: true,
                message: '请输入新密码!',
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
            name="confirm"
            label="确认密码"
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请再次确认密码!',
              },
              {
                min: 6,
                message: '密码长度需大于6个字符',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('两次输入的密码不一致!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UpdatePasswordModal;
