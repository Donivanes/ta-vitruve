import React from 'react';
import { toast } from 'react-toastify';
import { useUpdateAthlete } from '../../../hooks/useAthletes';
import { Athlete } from '@vitruve/database';
import { SubmitHandler } from 'react-hook-form';
import { AthleteForm, FormAthleteSchema } from '../AthleteForm';

interface EditAthleteFormProps {
  athlete: Athlete;
  onClose: () => void;
}

export const EditAthleteForm: React.FC<EditAthleteFormProps> = ({
  athlete,
  onClose,
}) => {
  const { mutateAsync, isPending } = useUpdateAthlete();

  const defaultValues = {
    name: athlete.name || '',
    age: athlete.age || 16,
    team: athlete.team || '',
  };

  const onSubmit: SubmitHandler<FormAthleteSchema> = (data) => {
    mutateAsync(
      {
        id: athlete.id,
        userData: data,
      },
      {
        onSuccess: () => {
          toast.success('Athlete edited successfully 🎉');
          onClose();
        },
        onError: () => {
          toast.error('Error editing athlete');
        },
      }
    );
  };

  return (
    <AthleteForm
      onSubmit={onSubmit}
      isLoading={isPending}
      buttonLabel="Save Changes"
      formTitle="Edit Athlete"
      defaultValues={defaultValues}
      dataCy="edit-athlete-form"
    />
  );
};
