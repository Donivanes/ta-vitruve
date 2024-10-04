import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import {
  createAthelete,
  deleteAthelete,
  fetchAthletes,
  fetchAthelete,
  updateAthelete,
  fetchAthleteMetrics,
  createAtheleteMetric,
} from '../api/athletes';
import { Athlete, MetricType, PerformanceMetric } from '@vitruve/database';

const useGetAthletes = (page = 1, take = 10) => {
  return useQuery({
    queryKey: ['athletes', page, take],
    queryFn: () => fetchAthletes(page, take),
    placeholderData: keepPreviousData,
    enabled: !!page,
  });
};

const useGetAthlete = (id: string) => {
  return useQuery({
    queryKey: ['athlete', id],
    queryFn: () => fetchAthelete(id),
    enabled: !!id,
  });
};

const useGetAthleteMetrics = (id: string, filter?: MetricType) => {
  return useQuery({
    queryKey: ['athlete-metrics', id, filter],
    queryFn: () => fetchAthleteMetrics(id, filter),
    placeholderData: keepPreviousData,
    enabled: !!id,
  });
};

const useCreateAthleteMetric = () => {
  return useMutation({
    mutationFn: (metricData: Partial<PerformanceMetric>) =>
      createAtheleteMetric(metricData.athleteId!, metricData),
  });
};

const useCreateAthlete = () => {
  return useMutation({
    mutationFn: (userData: Partial<Athlete>) => createAthelete(userData),
  });
};

const useDeleteAthlete = () => {
  return useMutation({
    mutationFn: (id: string) => deleteAthelete(id),
  });
};

const useUpdateAthlete = () => {
  return useMutation({
    mutationFn: ({
      id,
      userData,
    }: {
      id: string;
      userData: Partial<Athlete>;
    }) => updateAthelete(id, userData),
  });
};

export {
  useGetAthletes,
  useGetAthlete,
  useGetAthleteMetrics,
  useCreateAthleteMetric,
  useCreateAthlete,
  useDeleteAthlete,
  useUpdateAthlete,
};
