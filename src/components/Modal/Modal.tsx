import style from './Modal.module.scss';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { ModalPropTypes } from '../../utils/types';
import { useSelector } from '../../hooks/useReduxToolkit';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('root-modal');

const Modal: FC<ModalPropTypes> = ({ closeModal, title, children }) => {
  const navigate = useNavigate();

  const { status, orderCurrentInProgress } = useSelector((state) => state.ingredientsCurrentSlice);

  const handleCloseModal = () => {
    if (orderCurrentInProgress) {
      closeModal();
    } else {
      return;
    }
  };

  const handleButtonCloseModal = (event: KeyboardEvent) => {
    if (event.code === 'Escape') handleCloseModal();
  };

  useEffect(() => {
    if (status === null) {
      navigate('/');
    }

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

          {orderCurrentInProgress && (
            <button
              className={`${style.container__button}`}
              type='button'
              onClick={handleCloseModal}
            >
              <CloseIcon type='primary' />
            </button>
          )}

          {children}
        </section>
      </>,
      modalRoot,
    )
  );
};

export default Modal;
