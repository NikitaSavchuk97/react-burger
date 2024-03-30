import styles from './CenterElements.module.scss';

function CenterElements(props: any) {
  return <section className={styles.wrapper}>{props.children}</section>;
}

export default CenterElements;
