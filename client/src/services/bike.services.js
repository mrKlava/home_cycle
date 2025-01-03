import { makeRequest } from "../utils/axios";

const BASE_URL = '/bikes/';

/**
 * ### Bike Services
 * 
 * Used to interact with bikes
 */
const BikeServices = {
  /**
   * ### Get bikes data
   * 
   * Try to get list
   */
  async getBikes() {
    try {
      const resp = await makeRequest({ url: BASE_URL });

      return resp;
    } catch (err) {
      console.log(err);

      throw err;
    }
  },

  /**
   * ### Get bike data
   * 
   * Try to get specific bike by it's id
   * 
   * @param {number} id bike id
   */
  async getBikeById(id) {
    try {
      const resp = await makeRequest({ url: BASE_URL + id });

      return resp;
    } catch (err) {
      console.log(err);

      throw err;
    }
  },

  /**
   * ### Create new bike
   * 
   * Try to create new bike
   * 
   * @param {object} bikeData
   */
  async createBike(bikeData) {
    try {
      const resp = await makeRequest({ url: BASE_URL, method: 'post', data: bikeData });

      return resp;
    } catch (err) {
      console.log(err);

      throw err;
    }
  },

  /**
   * ### Update bike
   * 
   * Try to update bike
   * 
   * @param {object} bikeData
   */
  async updateBike(bikeData) {
    if (!bikeData.bikeId) return console.log('No bike id provided');

    try {
      const resp = await makeRequest({ url: BASE_URL + bikeData.bikeId, method: 'put', data: bikeData });

      return resp;
    } catch (err) {
      console.log(err);

      throw err;
    }
  },

  /**
   * ### Delete bike
   * 
   * @param {number} bikeId id of the bike to be deleted
   */
  async deleteBikeId(bikeId) {
    try {
      const resp = await makeRequest({ url: BASE_URL + bikeId, method: 'delete' });

      return resp;
    } catch (err) {
      console.log(err);

      throw err;
    }
  },

  /* COMMON */

  /**
   * ### Get bike types
   * 
   * Try to get list of bike types
   */
  async getBikeTypes() {
    try {
      const resp = await makeRequest({ url: BASE_URL + 'types' });

      return resp;
    } catch (err) {
      console.log(err);

      throw err;
    }
  },
}

export default BikeServices;