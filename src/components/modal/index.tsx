import React, { ReactNode } from "react";
import "./styles.css";

interface ModalComponentProps {
  isOpen: boolean;
  onRequestClose: () => void;
  modalTitle: string;
  children: ReactNode;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  isOpen,
  onRequestClose,
  modalTitle,
  children,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onRequestClose} className="close-button">
          &times;
        </button>
        <div className="modal-body">
          <h2 className="title-modal">{modalTitle}</h2>
          <div className="modal-body-content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
