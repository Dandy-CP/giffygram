import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { queryFetch } from '@/config/queryMutation';
import { GifTrendingResponse } from '@/types/gifTrending.type';
import { GifDetailResponse } from '@/types/contentDetail.types';
import { ApiError } from '@/types/client.types';

export function GetListTrendingGIF({
  options,
  params,
}: {
  options?: UseQueryOptions<GifTrendingResponse, ApiError>;
  params?: { [key: string]: any };
}) {
  return useQuery<GifTrendingResponse, ApiError>({
    queryKey: ['gif-trending'],
    queryFn: async () => {
      return await queryFetch({
        url: 'gifs/trending',
        inputParams: {
          ...params,
        },
      });
    },
    ...options,
  });
}

export function GetGIFByID({
  options,
  params,
}: {
  options?: UseQueryOptions<GifDetailResponse, ApiError>;
  params?: { [key: string]: any };
}) {
  return useQuery<GifDetailResponse, ApiError>({
    queryKey: ['gif-trending'],
    queryFn: async () => {
      return await queryFetch({
        url: `gifs/${params?.gif_id}`,
        inputParams: {
          ...params,
        },
      });
    },
    ...options,
  });
}
