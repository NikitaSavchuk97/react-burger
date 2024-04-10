import styles from './CenterElements.module.scss';
import { CenterElementsPropTypes } from '../../utils/types';

const CenterElements = (props: CenterElementsPropTypes) => {
  return <section className={styles.wrapper}>{props.children}</section>;
};

export default CenterElements;
