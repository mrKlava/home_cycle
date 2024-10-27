import axios from "axios"

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
 * @param {object} reqConfig
 * @param {'get' | 'post' | 'put'} reqConfig.method
 * @param {string} reqConfig.url
 * @param {object} reqConfig.data
 * @param {object} reqConfig.params
 */
export const makeRequest = async (reqConfig) => {
  const {method, url, params, data} = reqConfig

  try {
    const {status, data: respData} = await httpRequest({
      url,
      method: method || 'get',
      data,
      params
    })

    return {status, respData}
  } catch (error) {
    throw error
  }
} 