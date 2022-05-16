import React from 'react';
import { Modal, Button, Form, Input, Tag, Select, message } from 'antd';

const CloseDevice = ({ modalVisible, hideModal }) => {
  const msg = modalVisible == true ? '关闭' : '开启';
  const handleOk = () => {
    hideModal();
    message.success(`降尘喷雾${msg}成功`);
  };

  const handleCancel = () => {
    hideModal();
  };

  return (
    <>
      <Modal
        title={`${msg}降尘喷雾`}
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        size="small"
      >
        <h2>确定要{msg}所有除尘喷雾吗?</h2>
      </Modal>
    </>
  );
};

export default CloseDevice;
