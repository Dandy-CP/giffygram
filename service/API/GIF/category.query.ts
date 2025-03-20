import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { queryFetch } from '@/config/queryMutation';
import { CategoriesResponse } from '@/types/category.types';
import { ApiError } from '@/types/client.types';

export function GetListCategoryGIF({
  options,
  params,
}: {
  options?: UseQueryOptions<CategoriesResponse, ApiError>;
  params?: { [key: string]: any };
}) {
  return useQuery<CategoriesResponse, ApiError>({
    queryKey: ['gif-categories'],
    queryFn: async () => {
      return await queryFetch({
        url: 'gifs/categories',
        inputParams: {
          ...params,
        },
      });
    },
    ...options,
  });
}
