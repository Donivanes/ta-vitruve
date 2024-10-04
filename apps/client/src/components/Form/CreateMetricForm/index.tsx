import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { MetricType, UnitType } from '@vitruve/database';
import { toast } from 'react-toastify';
import { css } from '../../../../styled-system/css';
import { Button } from '../../Button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateAthleteMetric } from '../../../hooks/useAthletes';

export const performanceMetricSchema = z.object({
  metricType: z.enum(['SPEED', 'STRENGTH', 'STAMINA', 'ENDURANCE']),
  value: z.number().min(0, 'Value must be greater than 0'),
  unit: z.enum(['KG', 'METERS_PER_SECOND', 'KILOMETERS_PER_HOUR']),
});

export type FormPerformanceMetricSchema = z.infer<
  typeof performanceMetricSchema
>;

const inputs = [
  {
    name: 'metricType',
    label: 'Metric Type',
    type: 'select',
    options: [
      { value: 'SPEED', label: 'Speed' },
      { value: 'STRENGTH', label: 'Strength' },
      { value: 'STAMINA', label: 'Stamina' },
      { value: 'ENDURANCE', label: 'Endurance' },
    ],
  },
  {
    name: 'value',
    label: 'Value',
    type: 'number',
    placeholder: 'Enter value',
    registerOptions: { valueAsNumber: true },
  },
  {
    name: 'unit',
    label: 'Unit',
    type: 'select',
    options: [
      { value: 'KG', label: 'Kg' },
      { value: 'METERS_PER_SECOND', label: 'Meters/Second' },
      { value: 'KILOMETERS_PER_HOUR', label: 'Kilometers/Hour' },
    ],
  },
];

export const CreateMetricForm = ({
  onClose,
  athleteId,
}: {
  onClose: () => void;
  athleteId: string;
}) => {
  const { mutateAsync, isPending } = useCreateAthleteMetric();

  const defaultFormValues = {
    metricType: 'SPEED' as MetricType,
    value: 0,
    unit: 'KG' as UnitType,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormPerformanceMetricSchema>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(performanceMetricSchema),
  });

  const onSubmit: SubmitHandler<FormPerformanceMetricSchema> = (data) => {
    const formData = { ...data, athleteId: athleteId };

    mutateAsync(formData, {
      onSuccess: () => {
        toast.success('Performance Metric created!');
        onClose();
      },
      onError: () => {
        toast.error('Error creating performance metric');
      },
    });
  };

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
      data-cy="performance-metric-create-form"
    >
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
          {input.type === 'select' ? (
            <select
              className={css({
                padding: '10px 15px',
                borderRadius: '5px',
                border: errors[input.name as keyof FormPerformanceMetricSchema]
                  ? '1px solid red'
                  : '1px solid token(colors.gray.500)',
                transition: 'all 0.2s ease',
                '&:focus': {
                  outlineColor: errors[
                    input.name as keyof FormPerformanceMetricSchema
                  ]
                    ? 'red'
                    : 'gray.500',
                },
              })}
              data-cy={`performance-metric-input-${input.name}`}
              {...register(input.name as keyof FormPerformanceMetricSchema)}
            >
              {input.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              className={css({
                padding: '10px 15px',
                borderRadius: '5px',
                border: errors[input.name as keyof FormPerformanceMetricSchema]
                  ? '1px solid red'
                  : '1px solid token(colors.gray.500)',
                transition: 'all 0.2s ease',
                '&:focus': {
                  outlineColor: errors[
                    input.name as keyof FormPerformanceMetricSchema
                  ]
                    ? 'red'
                    : 'gray.500',
                },
              })}
              type={input.type}
              placeholder={input.placeholder}
              data-cy={`performance-metric-input-${input.name}`}
              {...register(
                input.name as keyof FormPerformanceMetricSchema,
                input.registerOptions
              )}
            />
          )}
          <p
            className={css({
              fontSize: '14px',
              fontWeight: '400',
              color: 'red.500',
              minHeight: '22px',
            })}
          >
            {errors[input.name as keyof FormPerformanceMetricSchema]?.message ||
              ' '}
          </p>
        </div>
      ))}
      <Button
        type="submit"
        disabled={isPending}
        data-cy="performance-metric-create-button"
      >
        {isPending ? 'Adding...' : 'Add Metric'}
      </Button>
    </form>
  );
};
