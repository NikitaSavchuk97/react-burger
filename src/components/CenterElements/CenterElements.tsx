import styles from './CenterElements.module.scss';

import { FC } from 'react';
import { CenterElementsPropTypes } from '../../utils/types';

const CenterElements: FC<CenterElementsPropTypes> = ({ children }) => {
  return <section className={styles.wrapper}>{children}</section>;
};

export default CenterElements;
