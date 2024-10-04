import api from '.';
import { PaginateAthletes } from '../types';
import { Athlete, MetricType, PerformanceMetric } from '@vitruve/database';

const fetchAthletes = async (
  page: number,
  take = 10
): Promise<PaginateAthletes> => {
  const { data } = await api.get<PaginateAthletes>(
    `/athletes?page=${page}&take=${take}`
  );
  return data;
};

const fetchAthelete = async (id: string): Promise<Athlete> => {
  const { data } = await api.get<Athlete>(`/athletes/${id}`);
  return data;
};

const fetchAthleteMetrics = async (
  id: string,
  filter?: MetricType
): Promise<PerformanceMetric[]> => {
  const url = filter
    ? `/athletes/${id}/metrics?filter=${filter}`
    : `/athletes/${id}/metrics`;
  const { data } = await api.get<PerformanceMetric[]>(url);
  return data;
};

const createAtheleteMetric = async (
  id: string,
  metricData: Partial<PerformanceMetric>
): Promise<PerformanceMetric> => {
  const { data } = await api.post<PerformanceMetric>(
    `/athletes/${id}/metrics`,
    metricData
  );
  return data;
};

const createAthelete = async (
  atheleteData: Partial<Athlete>
): Promise<Athlete> => {
  const { data } = await api.post<Athlete>(`/athletes`, atheleteData);
  return data;
};

const deleteAthelete = async (id: string): Promise<Athlete> => {
  const { data } = await api.delete<Athlete>(`/athletes/${id}`);
  return data;
};

const updateAthelete = async (
  id: string,
  atheleteData: Partial<Athlete>
): Promise<Athlete> => {
  const { data } = await api.patch<Athlete>(`/athletes/${id}`, atheleteData);
  return data;
};

export {
  fetchAthletes,
  fetchAthelete,
  fetchAthleteMetrics,
  createAtheleteMetric,
  createAthelete,
  deleteAthelete,
  updateAthelete,
};
