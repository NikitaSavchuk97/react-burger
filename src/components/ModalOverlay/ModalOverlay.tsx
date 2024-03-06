import { ModalOverlayPropTypes } from '../../utils/types';
import style from './ModalOverlay.module.scss';

function ModalOverlay(props: ModalOverlayPropTypes) {
  return <section className={style.container} onClick={props.closeModal}></section>;
}

export default ModalOverlay;
