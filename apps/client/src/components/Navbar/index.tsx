import React from 'react';
import { css } from '../../../styled-system/css';
import logo from '../../../assets/logo-negro.webp';
import { Link } from 'react-router-dom';
import { routes } from '../../constants';

export const Navbar = () => {
  return (
    <nav
      className={css({
        position: 'fixed',
        zIndex: 100,
        width: '100%',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        padding: '20px 30px',
        justifyContent: 'center',
        md: {
          padding: '30px 40px',
          justifyContent: 'flex-start',
        },
        boxShadow: 'lg',
      })}
    >
      <Link to={routes.DASHBOARD}>
        <img
          className={css({
            width: '100px',
            md: {
              maxWidth: '155px',
            },
          })}
          src={logo}
          alt="vitruve logo"
        />
      </Link>
    </nav>
  );
};
