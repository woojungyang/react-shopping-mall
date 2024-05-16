import React from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Logo from 'assets/images/common/logo.png';
import styles from 'styles/_header.module.scss';

export default function Header() {
  return (
    <div className={styles.header_container}>
      <div className={styles.category_wrapper}>
        <img
          src={require('assets/images/common/logo_trans.png')}
          alt="logo"
          className={styles.header_logo}
        />
        <div className={styles.category}>
          <Link to="/category/women">WOMEN</Link>
          <Link to="/category/men">MEN</Link>
          <Link to="/category/beauty">BEAUTY</Link>
          <Link to="/category/life">LIFE</Link>
          <Link to="/event">EVENT</Link>
        </div>
      </div>
      <div className={styles.user_wrapper}>
        <SearchIcon />
        <ShoppingBagIcon />
        <Link to="/login">LOGIN</Link>
      </div>
    </div>
  );
}
