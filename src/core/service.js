import axios from 'axios';
import { ACCESS_TOKEN_KEY } from 'core/constants';
import { createAxiosInstance } from './axios';

export default class Service {
  headers = {};
  axios;
  defaultOptions = { namespace: undefined };

  constructor(options) {
    this.defaultOptions = { ...this.defaultOptions, ...options };
    const endpoint =
      process.env.REACT_APP_API_URL || 'https://api-admin.shopdi.io/api/v1';
    this.axios = createAxiosInstance({
      baseURL: `${endpoint}/`,
    });
  }

  toQueryString(params) {
    const keys = Object.keys(params);
    const segments = keys.map(
      (k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`
    );
    return segments.join('&');
  }

  async restAsync(
    action,
    params = {},
    options = {
      headers: {},
      method: 'post',
    }
  ) {
    const { headers } = options;
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    try {
      const opts = {
        url: action,
        method: options.method,
        data: params,
        headers,
      };
      if (token) {
        Object.assign(opts.headers, { Authorization: `Bearer ${token}` });
      }
      const response = await this.axios.request(opts);
      return response?.data;
    } catch (err) {
      throw err.response;
    }
  }

  postFormData(action, data) {
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    return this.restAsync(action, data, {
      method: 'post',
      headers,
    });
  }

  get(action, params = {}, options = {}) {
    const { headers = {} } = options;
    const query = this.toQueryString(params);
    const path = query ? `${action}?${query}` : action;
    return this.restAsync(
      path,
      {},
      {
        method: 'get',
        headers,
      }
    );
  }

  post(action, params = {}, options = {}) {
    const { headers = {} } = options;
    return this.restAsync(action, params, {
      method: 'post',
      headers,
    });
  }

  put(action, params = {}, options = {}) {
    const { headers = {} } = options;
    return this.restAsync(action, params, {
      method: 'put',
      headers,
    });
  }

  delete(action, params = {}, options = {}) {
    const { headers = {} } = options;
    return this.restAsync(action, params, {
      method: 'delete',
      headers,
    });
  }

  uploadWithPreSignedUrl(config, file) {
    const { url, contentType } = config;
    return axios.put(url, file, { headers: { 'Content-Type': contentType } });
  }
}
