import React from 'react';
import styles from 'styles/_common.module.scss';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const BestProductCard = ({ isSmall = 0 }) => {
  return (
    <div className={styles.best_product_container} style={{ height: isSmall ? 450 : 380 }}>
      <img src={require('assets/images/sub/sub6.jpg')} />
      <FavoriteBorderIcon />
    </div>
  );
};
