import React from 'react';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { isAuthSelector, logout } from "../../redux/slicers/auth";

export const Header = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(isAuthSelector);

  const onClickLogout = () => {
    if(window.confirm('Do you really want to exit?'))
dispatch(logout())
    window.localStorage.removeItem('token')
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <a className={styles.logo} href="/">
            <div>Kadir blog</div>
          </a>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/posts/add-post">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/registration">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
