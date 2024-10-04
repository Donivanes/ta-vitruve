import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { css } from '../../../../styled-system/css';
import { Button } from '../../Button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const athleteSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  age: z.number().min(16, 'Must be at least 16 years old'),
  team: z.string().min(1, 'Team is required'),
});

export type FormAthleteSchema = z.infer<typeof athleteSchema>;

interface InputField {
  name: keyof FormAthleteSchema;
  label: string;
  placeholder: string;
  type: string;
  registerOptions?: object;
}

const inputs: InputField[] = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'Name',
    type: 'text',
  },
  {
    name: 'age',
    label: 'Age',
    placeholder: 'Age',
    type: 'number',
    registerOptions: { valueAsNumber: true },
  },
  {
    name: 'team',
    label: 'Team',
    placeholder: 'Team',
    type: 'text',
  },
];

interface AthleteFormProps {
  defaultValues?: FormAthleteSchema;
  onSubmit: SubmitHandler<FormAthleteSchema>;
  isLoading: boolean;
  buttonLabel: string;
  formTitle?: string;
  dataCy?: string;
}

export const AthleteForm: React.FC<AthleteFormProps> = ({
  defaultValues,
  onSubmit,
  isLoading,
  buttonLabel,
  formTitle,
  dataCy = 'athlete-form',
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormAthleteSchema>({
    defaultValues,
    resolver: zodResolver(athleteSchema),
  });

  return (
    <form
      className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        md: {
          padding: '30px 20px',
        },
      })}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      data-cy={dataCy}
    >
      {formTitle && (
        <h2
          className={css({
            marginBottom: '20px',
            fontSize: '24px',
            fontWeight: 'bold',
          })}
        >
          {formTitle}
        </h2>
      )}
      {inputs.map((input) => (
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            marginBottom: '20px',
          })}
          key={input.name}
        >
          <label
            className={css({
              fontWeight: 'bold',
              marginBottom: '10px',
            })}
          >
            {input.label}
          </label>
          <input
            className={css({
              padding: '10px 15px',
              borderRadius: '5px',
              border: errors[input.name]
                ? '1px solid red'
                : '1px solid token(colors.gray.500)',
              transition: 'all 0.2s ease',
              '&:focus': {
                outlineColor: errors[input.name] ? 'red' : 'gray.500',
              },
            })}
            type={input.type}
            placeholder={input.placeholder}
            data-cy={`athlete-input-${input.name}`}
            {...register(input.name, input.registerOptions)}
          />
          <p
            className={css({
              fontSize: '14px',
              fontWeight: '400',
              color: 'red.500',
              minHeight: '22px',
            })}
          >
            {errors[input.name]?.message || ' '}
          </p>
        </div>
      ))}
      <Button
        type="submit"
        disabled={isLoading}
        data-cy="athlete-submit-button"
      >
        {isLoading ? 'Processing...' : buttonLabel}
      </Button>
    </form>
  );
};
