/**
 * Reusable functions to interact with request
 */
const RequestTools = {
  /**
   * Check param exists and is init
   * @param {Express.Request} req 
   * @returns {null | number} int
   */
  getIntParam: (req, param) => {
    const int = req.params[param]

    // if no param return null
    if (!int) return null;

    const intParam = parseInt(int);

    // check if user ID is number
    if (isNaN(intParam)) return null;

    return intParam;
  },
  /**
   * Check param exists and is string
   * @param {Express.Request} req 
   * @returns {null | number} value
   */
  getStringParam: (req, param) => {
    const str = req.params[param]

    // if no param return null
    if (typeof str !== 'string') return null;

    return str;
  },


  /**
   * Check if key exists and is int
   * @param {Express.Request} req 
   * @param {any} key the key which must be extracted
   * @returns {null | number} int
   */
  getIntBody: (req, key) => {
    const int = req.body[key]

    // if no param return null
    if (!int) return null;

    const intParam = parseInt(int);

    // check if user ID is number
    if (isNaN(intParam)) return null;

    return intParam;
  },
  /**
  * Check if key exists and is string
  * @param {Express.Request} req 
  * @param {any} key the key which must be extracted
  * @returns {null | string} value
  */
  getStringBody: (req, key) => {
    const str = req.body[key]

    // if no param return null
    if (typeof str !== 'string') return null;

    return str.length ? str : null;
  },
  /**
  * Check if key exists and is string
  * @param {Express.Request} req 
  * @param {any} key the key which must be extracted
  * @returns {null | string} value
  */
  getBooleanBody: (req, key) => {
    const bool = req.body[key]

    return Boolean(bool);
  },
}

export default RequestTools;