import s from './Styles.module.css';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');
export default function Modal({ onCloseModal, largeImageURL }) {
  useEffect(() => {
    function handleEscKey(e) {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    }
    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [onCloseModal]);

  function closeModal(e) {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  }

  return createPortal(
    <div className={s.overlay} onClick={closeModal}>
      <div className={s.modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>,
    modalRoot
  );
}
