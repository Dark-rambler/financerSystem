import React from 'react';
import { Modal } from '@mantine/core';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StadisticsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {


  return (
    <Modal opened={isOpen} onClose={onClose}>
      {/* Contenido del modal */}
      <h2>Este es el contenido del modal</h2>
      <button onClick={onClose}>Cerrar Modal</button>
    </Modal>
  );
};

export default StadisticsModal;
