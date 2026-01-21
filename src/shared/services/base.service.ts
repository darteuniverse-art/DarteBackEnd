import { PaginationDto } from '../dto/pagination.dto';
import { PaginationMeta } from '../types/pagination';

export abstract class BaseService {
  protected getPagination(pagination?: PaginationDto) {
    const page = pagination?.page ?? 1;
    const limit = pagination?.limit ?? 20;
    const skip = (page - 1) * limit;

    return { page, limit, skip };
  }

  protected buildPaginationMeta(
    page: number,
    limit: number,
    total: number,
  ): PaginationMeta {
    const totalPages = Math.max(1, Math.ceil(total / limit));
    return { page, limit, total, totalPages };
  }
}
