import style from './ModalOverlay.module.scss';

function ModalOverlay(props: any) {
  return <section className={style.container} onClick={props.closeModal}></section>;
}

export default ModalOverlay;
