import { ContentData } from './contentData.types';

export interface GifTrendingResponse {
  data: ContentData[];
  meta: Meta;
  pagination: Pagination;
}

export interface Meta {
  status: number;
  msg: string;
  response_id: string;
}

export interface Pagination {
  total_count: number;
  count: number;
  offset: number;
}
