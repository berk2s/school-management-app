import client, {getLoggedClient} from './axios.service';

export const apiService = {
  post,
  get,
  authorizedPost,
  authorizedPut,
};

async function post(path: string, body?: any, params?: any, _headers?: any) {
  let responseData = null;

  let headers = _headers;

  if (!_headers) {
    headers = {
      'Content-Type': 'application/json',
    };
  }

  try {
    const response = await client.post(path, JSON.stringify(body), {
      params: params,
      headers: headers,
    });
    responseData = response.data;
  } catch (error) {
    return Promise.reject(error);
  }

  return responseData;
}

async function get(path: string, params?: {}) {
  let responseData = null;

  try {
    const loggedClient = await getLoggedClient();

    const response = await loggedClient.get(path, {
      params: params,
    });

    responseData = response.data;

    if (response.status !== 200 && response.status !== 201) {
      return Promise.reject(responseData);
    }
  } catch (error) {
    return Promise.reject(error);
  }
  return responseData;
}

async function authorizedPost(
  path: string,
  body?: any,
  params?: any,
  _headers?: any,
) {
  let responseData = null;

  let headers = _headers;

  if (!_headers) {
    headers = {
      'Content-Type': 'application/json',
    };
  }

  try {
    const loggedClient = await getLoggedClient();

    const response = await loggedClient.post(path, JSON.stringify(body), {
      params: params,
      headers: headers,
    });
    responseData = response.data;
  } catch (error) {
    return Promise.reject(error);
  }

  return responseData;
}

async function authorizedPut(
  path: string,
  body?: any,
  params?: any,
  _headers?: any,
) {
  let responseData = null;

  let headers = _headers;

  if (!_headers) {
    headers = {
      'Content-Type': 'application/json',
    };
  }

  try {
    const loggedClient = await getLoggedClient();

    const response = await loggedClient.put(path, JSON.stringify(body), {
      params: params,
      headers: headers,
    });
    responseData = response.data;
  } catch (error) {
    return Promise.reject(error);
  }

  return responseData;
}
