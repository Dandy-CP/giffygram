import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { queryFetch } from '@/config/queryMutation';
import { SearchResponse } from '@/types/search.types';
import { ApiError } from '@/types/client.types';

export function GetListSearch({
  options,
  params,
}: {
  options?: UseQueryOptions<SearchResponse, ApiError>;
  params?: { [key: string]: any };
}) {
  return useQuery<SearchResponse, ApiError>({
    queryKey: ['gif-search'],
    queryFn: async () => {
      return await queryFetch({
        url: 'gifs/search',
        inputParams: {
          ...params,
        },
      });
    },
    ...options,
  });
}
