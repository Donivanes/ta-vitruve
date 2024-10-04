import React from 'react';
import { css } from '../../../styled-system/css';
import { Athlete } from '@vitruve/database';
import { Button } from '../Button';
import { ModalType } from '../../pages/athlete';

interface AthleteCardProps {
  athlete: Athlete | undefined;
  openModal: (type: ModalType) => void;
}

export const AthleteCard = ({ athlete, openModal }: AthleteCardProps) => {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid token(colors.emerald.500)',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: 'md',
        maxWidth: '400px',
        gap: '8px',
      })}
    >
      {athlete ? (
        <>
          <h1
            className={css({
              textAlign: 'center',
              textDecoration: 'underline',
            })}
          >
            Athlete info
          </h1>
          <p
            className={css({
              fontSize: '25px',
            })}
          >
            <b>Name:</b> {athlete?.name}
          </p>
          <p
            className={css({
              fontSize: '25px',
            })}
          >
            <b>Age:</b> {athlete?.age}
          </p>
          <p
            className={css({
              fontSize: '25px',
            })}
          >
            <b>Team:</b> {athlete?.team}
          </p>
          <div
            className={css({
              display: 'flex',
              gap: '10px',
              justifyContent: 'flex-end',
            })}
          >
            <Button
              size="sm"
              className={css({ alignSelf: 'end' })}
              onClick={() => openModal('edit')}
              data-cy="edit-athlete-button"
            >
              Edit
            </Button>
            <Button
              action="delete"
              size="sm"
              className={css({ alignSelf: 'end' })}
              onClick={() => openModal('delete')}
              data-cy="delete-athlete-button"
            >
              Delete
            </Button>
          </div>
        </>
      ) : (
        <h1>No athlete found</h1>
      )}
    </div>
  );
};
