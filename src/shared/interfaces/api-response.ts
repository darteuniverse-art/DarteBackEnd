import { PaginationMeta } from '../types/pagination';

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

export interface ApiMeta {
  statusCode: number;
  timestamp: string;
  path?: string;
  pagination?: PaginationMeta;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: ApiMeta;
}
