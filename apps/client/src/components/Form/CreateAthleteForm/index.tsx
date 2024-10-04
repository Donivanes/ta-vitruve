import React from 'react';
import { toast } from 'react-toastify';
import { useCreateAthlete } from '../../../hooks/useAthletes';

import { SubmitHandler } from 'react-hook-form';
import { AthleteForm, FormAthleteSchema } from '../AthleteForm';

export const CreateAthleteForm: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const { mutateAsync, isPending } = useCreateAthlete();

  const defaultValues = {
    name: '',
    age: 16,
    team: '',
  };

  const onSubmit: SubmitHandler<FormAthleteSchema> = (data) => {
    mutateAsync(data, {
      onSuccess: () => {
        toast.success('Athlete created successfully 🎉');
        onClose();
      },
      onError: () => {
        toast.error('Error creating athlete');
      },
    });
  };

  return (
    <AthleteForm
      onSubmit={onSubmit}
      isLoading={isPending}
      buttonLabel="Add Athlete"
      formTitle="Create Athlete"
      defaultValues={defaultValues}
      dataCy="create-athlete-form"
    />
  );
};
