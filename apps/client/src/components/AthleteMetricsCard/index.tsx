import React from 'react';
import { css } from '../../../styled-system/css';
import { MetricType, PerformanceMetric, UnitType } from '@vitruve/database';
import { Button } from '../Button';
import { ModalType } from '../../pages/athlete';

interface AthleteMetricsCardProps {
  metrics: PerformanceMetric[] | undefined;
  openModal: (type: ModalType) => void;
  setMetricFilter: (filter: MetricType | undefined) => void;
  metricFilter: MetricType | undefined;
}

const unitMap: Record<UnitType, string> = {
  KG: 'Kg',
  METERS_PER_SECOND: 'Meters/Second',
  KILOMETERS_PER_HOUR: 'Kilometers/Hour',
};

const metricTypeMap: Record<MetricType, string> = {
  SPEED: 'Speed',
  STRENGTH: 'Strength',
  STAMINA: 'Stamina',
  ENDURANCE: 'Endurance',
};

export const AthleteMetricsCard = ({
  openModal,
  metrics,
  metricFilter,
  setMetricFilter,
}: AthleteMetricsCardProps) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setMetricFilter(value ? (value as MetricType) : undefined);
  };

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid token(colors.emerald.500)',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: 'md',
        backgroundColor: 'white',
        gap: '20px',
      })}
    >
      <Button
        size="sm"
        onClick={() => openModal('addMetric')}
        data-cy="add-metric-button"
      >
        Add metric
      </Button>
      <h1
        className={css({
          textAlign: 'center',
          textDecoration: 'underline',
        })}
      >
        Athlete metrics
      </h1>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          alignItems: 'center',
          md: {
            flexDirection: 'row',
          },
        })}
      >
        <h2>Filter by metric type:</h2>
        <select
          onChange={handleFilterChange}
          value={metricFilter}
          className={css({
            padding: '10px 15px',
            borderRadius: '5px',
            maxWidth: '200px',
            border: '1px solid token(colors.gray.500)',
            transition: 'all 0.2s ease',
            '&:focus': {
              outlineColor: 'gray.500',
            },
          })}
        >
          <option value="">All</option>
          {Object.keys(metricTypeMap).map((option) => (
            <option key={option} value={option}>
              {metricTypeMap[option]}
            </option>
          ))}
        </select>
      </div>
      {metrics?.length ? (
        <>
          <div
            className={css({
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'column',
              gap: '25px',
              md: {
                flexDirection: 'row',
              },
            })}
          >
            {metrics.map((metric, i) => (
              <ul key={metric.id}>
                <li
                  className={css({
                    border: '1px solid token(colors.emerald.500)',
                    borderRadius: '8px',
                    padding: '20px',
                  })}
                >
                  <h2>
                    <b>Metric type:</b> {metricTypeMap[metric.metricType]}
                  </h2>
                  <h2>
                    <b>Value:</b> {metric.value}
                  </h2>
                  <h2>
                    <b>Unit:</b> {unitMap[metric.unit]}
                  </h2>
                  <h2>
                    Date:{' '}
                    {new Date(metric.createdAt).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </h2>
                </li>
              </ul>
            ))}
          </div>
        </>
      ) : (
        <h1>There are no metrics to show.</h1>
      )}
    </div>
  );
};
