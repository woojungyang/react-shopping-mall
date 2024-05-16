import React from 'react';
import { CommonLayout } from 'components/common';
import styles from 'styles/_main.module.scss';

export default function Main() {
  return (
    <CommonLayout>
      <div className={styles.main_image_container}>
        <img src={require('assets/images/main/main2.jpg')} className={styles.main_image} />
      </div>
    </CommonLayout>
  );
}
