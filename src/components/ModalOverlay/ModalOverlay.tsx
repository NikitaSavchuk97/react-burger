import style from './ModalOverlay.module.scss';

import { FC } from 'react';
import { ModalOverlayPropTypes } from '../../utils/types';

const ModalOverlay: FC<ModalOverlayPropTypes> = ({ closeModal }) => {
  return <section className={style.container} onClick={closeModal}></section>;
};

export default ModalOverlay;
