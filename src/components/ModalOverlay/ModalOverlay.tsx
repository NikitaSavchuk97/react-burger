import style from './ModalOverlay.module.scss';
import { closeModal } from '../../redux/slices/modalSlice';
import { useDispatch } from 'react-redux';

function ModalOverlay(props: any) {
  return <section className={style.container} onClick={props.closeModal}></section>;
}

export default ModalOverlay;
