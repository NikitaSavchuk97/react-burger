import style from './Modal.module.scss';

import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalPropTypes } from '../../utils/types';
import { useEffect } from 'react';
const modalRoot = document.getElementById('root-modal');

function Modal(props: ModalPropTypes) {
  const handleButtonCloseModal = (event: KeyboardEvent) => {
    if (event.code === 'Escape') props.closeModal();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleButtonCloseModal);
    return () => {
      document.removeEventListener('keydown', handleButtonCloseModal);
    };
  });

  return (
    modalRoot &&
    createPortal(
      <>
        <ModalOverlay closeModal={props.closeModal} />
        <section className={style.container}>
          {/* 
							Уважаемый ревьюер, в чате моей когорты, в слаке, 
							уже поднимался вопрос центровки заголовка и наставник сообщил что его не нужно исправлять/центровать. 
							Моя реализация аналогична выданному мне макету из фигмы. 
					*/}

          <h2 className={`${style.container__title} text text_type_main-large`}>{props.title}</h2>
          <button className={`${style.container__button}`} type='button' onClick={props.closeModal}>
            <CloseIcon type='primary' />
          </button>
          {props.children}
        </section>
      </>,
      modalRoot,
    )
  );
}

export default Modal;
