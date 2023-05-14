import React from 'react'
import { Modal } from 'antd';
import { SendOutlined, CloseOutlined  } from "@ant-design/icons";


const NewPostModal = (props) => {
    const {isModalOpen, handleOk, handleCancel} = props;
  return (
      <Modal title="Create new post" 
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel} 
        cancelText={<CloseOutlined className="modal-footer-icon"/>}
        okText={<SendOutlined className="modal-footer-icon" />}
        >
        {props.children}
      </Modal>
  );
};


export default NewPostModal;