import React, { Children } from 'react'
import { Modal } from 'antd';

const NewPostModal = (props) => {
    const {isModalOpen, handleOk, handleCancel} = props;
  return (
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
        {props.children}
      </Modal>
  );
};


export default NewPostModal;