import React from 'react';
import { css } from '../../../styled-system/css';
import { Button } from '../Button';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={css({
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 50,
      })}
    >
      <div
        className={css({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        })}
        onClick={onClose}
      />

      <div
        className={css({
          position: 'relative',
          backgroundColor: 'white',
          color: 'gray.900 !important',
          padding: '20px',
          borderRadius: '8px',
          zIndex: 60,
          width: '90%',
          maxWidth: '500px',
          boxShadow: 'lg',
        })}
      >
        <Button
          onClick={onClose}
          size="sm"
          className={css({
            position: 'absolute',
            zIndex: 70,
            top: '10px',
            right: '10px',
            backgroundColor: 'transparent',
            border: 'none !important',
            borderRadius: '50%',
            fontSize: '20px',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'emerald.200 !important',
            },
          })}
        >
          ✖
        </Button>
        {children}
      </div>
    </div>
  );
};
