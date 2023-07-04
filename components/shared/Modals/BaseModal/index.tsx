import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";

interface ModalBaseProps {
  children: React.ReactNode;
  title: string;
}


const ModalBase: React.FC<ModalBaseProps> = ({ children, title }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpenModal}>Toggle modal</Button>
        <Modal show={showModal} onClose={handleCloseModal}>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default ModalBase;
