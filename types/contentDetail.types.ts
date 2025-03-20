import { ContentData } from './contentData.types';

export interface GifDetailResponse {
  data: ContentData;
  meta: Meta;
}

export interface Meta {
  status: number;
  msg: string;
  response_id: string;
}
