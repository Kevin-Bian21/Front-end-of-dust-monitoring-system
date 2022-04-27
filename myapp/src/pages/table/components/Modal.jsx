import React from 'react';
import { Modal as AntdModal, Button } from 'antd';

const Modal = ({ modalVisible, hideModal }) => {
  return (
    <div>
      <AntdModal
        title="Basic Modal"
        visible={modalVisible}
        //onOk={handleOk}
        onCancel={hideModal}
      ></AntdModal>
    </div>
  );
};

export default Modal;
