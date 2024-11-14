/**
 * Reusable functions to interact with res.params
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
   * @returns {null | number} int
   */
  getStringParam: (req, param) => {
    const str = req.params[param]

    // if no param return null
    if (typeof str !== 'string') return null;
  
    return str;
  }
}

export default RequestTools;