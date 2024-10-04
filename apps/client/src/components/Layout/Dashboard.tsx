import React from 'react';
import { Navbar } from '../Navbar';
import { Sidebar } from '../Sidebar';
import { css } from '../../../styled-system/css';
import { IonContent } from '@ionic/react';

export const Dashboard = ({ children }): JSX.Element => (
  <>
    <Navbar />
    <div
      className={css({
        display: 'flex',
        height: '100%',
        backgroundColor: 'white',
        color: 'gray.900',
        mt: '90px',
        md: {
          mt: '110px',
        },
      })}
    >
      <Sidebar />
      <main
        className={css({
          display: 'flex',
          overflow: 'auto',
          width: '100%',
          flexDirection: 'column',
          flex: 8,
        })}
      >
        <IonContent fullscreen>
          <div className={css({ padding: '40px' })}>{children}</div>
        </IonContent>
      </main>
    </div>
  </>
);
