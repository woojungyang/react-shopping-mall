import React from 'react';
import Header from './Header';
import styles from 'styles/_common.module.scss';

export const CommonLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      CommonLayout
      {children}
    </div>
  );
};
