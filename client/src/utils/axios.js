import axios from "axios"

/* create reusable instance of axios with preset configuration: */
export const httpRequest = axios.create({
  baseURL: "http://localhost:2280/api/",    // URL of backend
  withCredentials: true                     // requests should be made using credentials such as cookies, authorization headers or TLS client certificates
})