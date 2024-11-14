/**
 * Reusable functions to interact with res.params
 */
const ResponseTools = {
  /**
   * Get user data from res.locals 
   * and check if he has valid data
   * 
   * @param {Express.Response} res 
   * @returns {null | object}
   */
  getUserFromLocals: (res) => {
    const { user } = res.locals;
    
    if (!user) return null;
  
    // check if user ID is number
    if (isNaN(user.id)) return null;
  
    return user;
  }
}

export default ResponseTools;