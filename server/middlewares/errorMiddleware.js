import { RESPONSES } from "../constants/index.js";

const errorMiddleware = async (err, req, res, next) => {
  try {
    console.log('\nError Middleware:\n')
    const { message, stack } = err;

    console.log(message);

    return res.status(200).json({error: message});
  } catch (err) {
    return res.status(500).json({error: RESPONSES.ERRORS.ERROR_MIDDLEWARE_CRASH})
  }
}

export default errorMiddleware;