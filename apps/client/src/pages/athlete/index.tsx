import React, { useState } from 'react';
import { IonPage } from '@ionic/react';
import { Dashboard } from '../../components/Layout/Dashboard';
import { useGetAthlete, useGetAthleteMetrics } from '../../hooks/useAthletes';
import { useParams } from 'react-router-dom';
import { AthleteCard } from '../../components/AthleteCard';
import { AthleteMetricsCard } from '../../components/AthleteMetricsCard';
import { css } from '../../../styled-system/css';
import { Modal } from '../../components/Modal';
import { EditAthleteForm } from '../../components/Form/EditAthleteForm';
import { CreateMetricForm } from '../../components/Form/CreateMetricForm';
import DeleteConfirmation from '../../components/Modal/DeleteConfirmation';
import { MetricType } from '@vitruve/database';
import { queryClient } from '../../App';

export type ModalType = 'edit' | 'addMetric' | 'delete' | null;

const AthletePage: React.FC = () => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [metricFilter, setMetricFilter] = useState<MetricType | undefined>(
    undefined
  );

  const { id } = useParams<{ id: string }>();

  const { data: athleteInfo, isLoading, refetch } = useGetAthlete(id);

  const {
    data: athleteMetrics,
    isLoading: isMetricsLoading,
    refetch: refetchMetrics,
  } = useGetAthleteMetrics(id, metricFilter);

  const handleOpenModal = (type: ModalType) => {
    setModalType(type);
  };

  const handleCloseModal = () => {
    switch (modalType) {
      case 'edit':
        refetch();
        queryClient.invalidateQueries({
          queryKey: ['athletes', 1, 10],
        });
        break;
      case 'addMetric':
        refetchMetrics();
        break;
      default:
        break;
    }
    setModalType(null);
  };

  return (
    <IonPage>
      <>
        <Dashboard>
          <section
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            })}
          >
            <div>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <AthleteCard
                  athlete={athleteInfo}
                  openModal={handleOpenModal}
                />
              )}
            </div>
            <div>
              {isMetricsLoading ? (
                <p>Loading...</p>
              ) : (
                <AthleteMetricsCard
                  metrics={athleteMetrics}
                  openModal={handleOpenModal}
                  metricFilter={metricFilter}
                  setMetricFilter={setMetricFilter}
                />
              )}
            </div>
          </section>
        </Dashboard>
        <Modal isOpen={modalType !== null} onClose={handleCloseModal}>
          {modalType === 'addMetric' && (
            <CreateMetricForm onClose={handleCloseModal} athleteId={id} />
          )}
          {modalType === 'edit' && (
            <EditAthleteForm
              athlete={athleteInfo!}
              onClose={handleCloseModal}
            />
          )}
          {modalType === 'delete' && (
            <DeleteConfirmation onClose={handleCloseModal} athleteId={id} />
          )}
        </Modal>
      </>
    </IonPage>
  );
};

export default AthletePage;
