import logger from "../utils/logger.js";
import morgan from "morgan";

const morganFormat = ":method :url :status :response-time ms";

export const loggerMiddleware =
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const messageParts = message.split(" ");
      const logObject = {
        method: messageParts[0],
        url: messageParts[1],
        status: messageParts[2],
        responseTime: messageParts[3],
      };
        logger.info(JSON.stringify(logObject));
      },
    },
  })