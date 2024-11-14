const logRequestMiddleware = async (req, res, next) => {
  try {
    const { method, url, params, body } = req
    const date = new Date().toLocaleDateString('en-GB')
  
    console.log(date, method, url, params, body)
  
    return next()
  } catch (err) {
    return next(err)
  }
}

export default logRequestMiddleware;