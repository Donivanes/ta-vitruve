import React from 'react';
import { toast } from 'react-toastify';
import { Button } from '../../Button';
import { useDeleteAthlete } from '../../../hooks/useAthletes';
import { css } from '../../../../styled-system/css';
import { useHistory } from 'react-router-dom';
import { routes } from '../../../constants';
import { queryClient } from '../../../App';

const DeleteConfirmation = ({
  onClose,
  athleteId,
}: {
  onClose: () => void;
  athleteId: string;
}) => {
  const { mutateAsync, isPending } = useDeleteAthlete();

  const history = useHistory();

  const handleDelete = async () => {
    await mutateAsync(athleteId, {
      onSuccess: () => {
        toast.success('Athlete deleted successfully 🎉');
        queryClient.invalidateQueries({ queryKey: ['athletes'] });
        history.push(routes.DASHBOARD);
      },
      onError: () => {
        toast.error('Error deleting athlete');
      },
    });
    onClose();
  };

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        md: {
          padding: '30px 20px',
        },
      })}
      data-cy="delete-confirmation"
    >
      <h1>Delete confirmation</h1>
      <p>Are you sure you want to delete this athlete?</p>
      <Button
        action="delete"
        onClick={handleDelete}
        data-cy="delete-athlete-confirmation-button"
      >
        {isPending ? 'Deleting...' : 'Delete'}
      </Button>
    </div>
  );
};

export default DeleteConfirmation;
