import React, { useState } from 'react';
import { IonPage } from '@ionic/react';
import { Dashboard } from '../../components/Layout/Dashboard';
import { Button } from '../../components/Button';
import { useGetAthletes } from '../../hooks/useAthletes';
import { AthletesTable } from '../../components/AthletesTable';
import { Modal } from '../../components/Modal';
import { CreateAthleteForm } from '../../components/Form/CreateAthleteForm';

const DashboardPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, refetch } = useGetAthletes(page || 1);

  const { data: athletesData, meta } = data || {};

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  const handleAthleteCreated = () => {
    refetch();
    handleClose();
  };

  return (
    <IonPage>
      <>
        <Dashboard>
          <Button
            size="md"
            onClick={handleOpen}
            data-cy="create-athlete-button"
          >
            Add new athlete
          </Button>
          {data && (
            <AthletesTable data={athletesData} meta={meta} setPage={setPage} />
          )}
          {isLoading && <p>Loading...</p>}
          {!isLoading && !athletesData?.length && <p>No athletes found</p>}
        </Dashboard>
        <Modal isOpen={isModalOpen} onClose={handleClose}>
          <CreateAthleteForm onClose={handleAthleteCreated} />
        </Modal>
      </>
    </IonPage>
  );
};

export default DashboardPage;
