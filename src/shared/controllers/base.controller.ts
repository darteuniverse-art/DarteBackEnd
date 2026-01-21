import { ApiMeta, ApiResponse } from '../interfaces/api-response';
import { PaginationMeta } from '../types/pagination';

export abstract class BaseController {
  protected ok<T>(data: T, meta?: ApiMeta): ApiResponse<T> {
    return { success: true, data, meta };
  }

  protected created<T>(data: T, meta?: ApiMeta): ApiResponse<T> {
    return { success: true, data, meta };
  }

  protected paginated<T>(
    data: T,
    pagination: PaginationMeta,
    meta?: Omit<ApiMeta, 'pagination'>,
  ): ApiResponse<T> {
    return {
      success: true,
      data,
      meta: { ...meta, pagination },
    };
  }
}
