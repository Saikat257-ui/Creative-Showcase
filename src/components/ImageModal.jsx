import React from 'react';
import './ImageModal.css';

function ImageModal({ isOpen, onClose, imageSrc }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>
        <img src={imageSrc} alt="Preview" className="modal-image" />
      </div>
    </div>
  );
}

export default ImageModal;
