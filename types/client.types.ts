export type MutationMethodType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface QueryFetchOptions {
  url: string;
  inputParams?: { [key: string]: any };
  token?: string;
}

export interface MutationDataOptions {
  url: string;
  method: MutationMethodType;
  body?: { [key: string]: any };
  baseURL?: string;
  inputParams?: { [key: string]: any };
}

export interface MutationFormDataOptions {
  url: string;
  method: MutationMethodType;
  body: { [key: string]: string };
  baseURL?: string;
  inputParams?: { [key: string]: any };
}

export interface MessageResult {
  status: number;
  message: string;
}

export interface ApiError {
  response: {
    data: {
      data: [];
      meta: {
        status: number;
        msg: string;
        response_id: string;
      };
    };
  };
}
