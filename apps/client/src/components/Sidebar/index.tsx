import React from 'react';
import { routes } from '../../constants';
import { css } from '../../../styled-system/css';
import { Link } from 'react-router-dom';

type SidebarItem = {
  name: string;
  route: string;
};

const sidebarItems: SidebarItem[] = [
  {
    name: 'Dashboard',
    route: routes.DASHBOARD,
  },
];

export const Sidebar = () => {
  return (
    <aside
      data-cy="sidebar"
      className={css({
        display: 'none',
        flexDirection: 'column',
        flex: 1,
        padding: '40px',
        borderRight: '1px solid token(colors.gray.200)',
        md: {
          display: 'flex',
        },
      })}
    >
      <ul>
        {sidebarItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.route}
              className={css({
                display: 'flex',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                color: 'gray.900 !important',
                transition: 'color 0.2s ease-in-out',
                '&:hover': {
                  textDecoration: 'underline',
                  color: 'emerald.600 !important',
                },
              })}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};
