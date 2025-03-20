import qs from 'querystring';
import { client } from './axiosClient';
import {
  QueryFetchOptions,
  MutationDataOptions,
  MutationFormDataOptions,
} from '@/types/client.types';

export async function queryFetch<T>({
  url,
  inputParams,
}: QueryFetchOptions): Promise<T> {
  let params = '';

  if (inputParams) {
    params = qs.stringify(inputParams);
  }

  return new Promise(async (resolve, reject) => {
    try {
      let fetchUrl = url;

      if (params) {
        fetchUrl +=
          `?api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY}` + '&' + params;
      } else {
        fetchUrl += `?api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY}`;
      }

      const response = await client.get(fetchUrl);
      const json = await response.data;

      resolve(json);
    } catch (error) {
      reject(error);
    }
  });
}

export async function mutationData<T>({
  url,
  method,
  body,
  baseURL,
  inputParams,
}: MutationDataOptions): Promise<T> {
  let params = '';

  if (inputParams) {
    params = qs.stringify(inputParams);
  }

  return new Promise(async (resolve, reject) => {
    try {
      let mutationUrl = url;

      if (params) {
        mutationUrl +=
          `?api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY}` + '&' + params;
      } else {
        mutationUrl += `?api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY}`;
      }

      const response = await client.request({
        ...(!!baseURL && { baseURL }),
        url: mutationUrl,
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        data: body,
      });

      const json = await response.data;

      resolve(json);
    } catch (error) {
      reject(error);
    }
  });
}

export async function mutationFormData<T>({
  url,
  body,
  method,
  inputParams,
}: MutationFormDataOptions): Promise<T> {
  let params = '';

  if (inputParams) {
    params = qs.stringify(inputParams);
  }

  return new Promise(async (resolve, reject) => {
    try {
      let mutationUrl = url;

      if (params) {
        mutationUrl +=
          `?api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY}` + '&' + params;
      } else {
        mutationUrl += `?api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY}`;
      }

      const form = new FormData();
      const keys = Object.keys(body);
      const bodyValue = Object.values(body);

      bodyValue.map((value, index) => {
        return form.append(keys[index], value);
      });

      const response = await client.request({
        url: mutationUrl,
        method,
        data: form,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const json = await response.data;

      resolve(json);
    } catch (error) {
      reject(error);
    }
  });
}
