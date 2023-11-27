import style from './ModalOverlay.module.scss';
function ModalOverlay(props: { closeModal: () => void }) {
  return <section className={style.container} onClick={props.closeModal}></section>;
}

export default ModalOverlay;
