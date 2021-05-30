import axios, { AxiosRequestConfig } from 'axios'

const instance = axios.create({
  baseURL: 'https://yalantis-react-school-api.yalantis.com/api/task0',
})

export const createApiCall = ({ method = 'GET', url = '', data = {} }: AxiosRequestConfig) => {
  const headers: any = {
    'Content-Type': 'application/json',
    cache: 'no-cache',
  }

  return instance
    .request({
      method,
      url,
      data,
      headers,
    })
    .then(response => response)
    .catch(error => error.response)
}
