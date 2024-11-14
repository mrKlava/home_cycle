import axios, { Axios } from "axios"

const API_URL = import.meta.env.VITE_API_URL

/**
 * Reusable axios instance
 * 
 * @see https://axios-http.com/docs/req_config
 */
export const httpRequest = axios.create({
  baseURL: API_URL,    // URL of backend
  withCredentials: true                     // requests should be made using credentials such as cookies, authorization headers or TLS client certificates
})


/**
 * Custom Axios function to make requests
 * 
 * @param {Axios.reqConfig} reqConfig
 * @param {'get' | 'post' | 'put'} reqConfig.method
 * @param {string} reqConfig.url
 * @param {object} reqConfig.data
 * @param {object} reqConfig.params
 * @return {{data: {}, status:number}}
 */
export const makeRequest = async (reqConfig) => {
  try {
    const {status, data} = await httpRequest(reqConfig);

    return {
      data: data.data,
      message: data.message || '',
      error: data.error || '',
      code: status
    }
  } catch (error) {
    throw error
  }
} 