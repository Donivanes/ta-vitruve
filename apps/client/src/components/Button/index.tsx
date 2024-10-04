import { styled } from '../../../styled-system/jsx';
import { cva, type RecipeVariantProps } from '../../../styled-system/css';

const buttonStyle = cva({
  base: {
    color: 'gray.800',
    backgroundColor: 'emerald.300',
    textAlign: 'center',
    fontWeight: 'bold',
    width: 'max-content',
    padding: '10px 20px !important',
    borderRadius: '6px !important',
    border: '1px solid token(colors.gray.800) !important',
    transition: 'background-color 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: 'emerald.400',
      '&:disabled': {
        backgroundColor: 'gray.200',
      },
    },
    '&:disabled': {
      backgroundColor: 'gray.200',
      color: 'gray.500',
      cursor: 'not-allowed !important',
    },
  },
  variants: {
    size: {
      sm: {
        fontSize: '1rem',
      },
      md: {
        fontSize: '1.25rem',
      },
      lg: {
        fontSize: '1.5rem',
      },
    },
    action: {
      delete: {
        backgroundColor: 'red.300',
        '&:hover': {
          backgroundColor: 'red.400',
        },
      },
    },
  },
});

export type ButtonVariants = RecipeVariantProps<typeof buttonStyle>;

export const Button = styled('button', buttonStyle);
