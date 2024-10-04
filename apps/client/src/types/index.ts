import { Athlete } from '@vitruve/database';

export interface PaginationMeta {
  currentPage: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface PaginateAthletes {
  data: Athlete[] | undefined;
  meta: PaginationMeta | undefined;
}
