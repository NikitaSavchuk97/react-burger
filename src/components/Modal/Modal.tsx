import style from './Modal.module.scss';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalPropTypes } from '../../utils/types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('root-modal');

const Modal: FC<ModalPropTypes> = ({ closeModal, title, children }) => {
  const handleCloseModal = () => {
    closeModal();
  };

  const handleButtonCloseModal = (event: KeyboardEvent) => {
    if (event.code === 'Escape') handleCloseModal();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleButtonCloseModal);
    return () => {
      document.removeEventListener('keydown', handleButtonCloseModal);
    };
  }, [handleButtonCloseModal]);

  return (
    modalRoot &&
    createPortal(
      <>
        <ModalOverlay closeModal={handleCloseModal} />
        <section className={style.container}>
          <h2 className={`${style.container__title} text text_type_main-large`}>{title}</h2>
          <button className={`${style.container__button}`} type='button' onClick={handleCloseModal}>
            <CloseIcon type='primary' />
          </button>
          {children}
        </section>
      </>,
      modalRoot,
    )
  );
};

export default Modal;
