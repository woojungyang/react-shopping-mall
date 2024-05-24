import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import styles from 'styles/_header.module.scss';
import classNames from 'classnames';

export default function Header() {
  const [position, setPosition] = useState(0);
  const switchPosition = position > 100;
  function onScroll() {
    setPosition(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      className={classNames(
        { [styles.header_container]: true },
        { [styles.header_container_dark]: switchPosition }
      )}
    >
      <div className={styles.header_wrapper}>
        <div className={styles.category_wrapper}>
          <img
            src={
              switchPosition
                ? require('assets/images/common/logo.png')
                : require('assets/images/common/logo_trans.png')
            }
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
    </div>
  );
}
