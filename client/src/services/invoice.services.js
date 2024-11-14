import { makeRequest } from "../utils/axios"

const BASE_URL = '/invoices/'

const InvoiceServices = {

  /**
   * Gets list of invoices
   */
  async getInvoices() {
    try {
      const resp = await makeRequest({ url: BASE_URL })

      return resp
    } catch (err) {
      console.log(err)
      throw err
    }
  },

  /**
   * Gets invoice by it's id
   * @param {string} id invoice ID
   */
  async getInvoiceById(id) {
    try {
      const resp = await makeRequest({ url: BASE_URL + id })

      return resp
    } catch (err) {
      console.log(err)
      throw err
    }
  },
}

export default InvoiceServices;