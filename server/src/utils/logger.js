import { createLogger, format, transports } from 'winston';
import 'dotenv/config';

const { combine, timestamp, json, printf } = format;

const isDevelopment = process.env.NODE_ENV === 'development';

// Define custom formats for logs
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}${stack ? `\nStack: ${stack}` : ''}`;
});

// Create a Winston logger instance
const logger = createLogger({
  level: isDevelopment ? 'debug' : 'info', // Debug in development, Info in production
  format: combine(timestamp(), json()), // Default format
  transports: [
    new transports.File({
      filename: 'logs/info.log',
      level: 'info',
      format: combine(timestamp(), logFormat), // Custom format for info logs
    }),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: combine(timestamp(), logFormat), // Include stack in error logs
    }),
  ],
});

// Add debug log file in development only
if (isDevelopment) {
  logger.add(
    new transports.File({
      filename: 'logs/debug.log',
      level: 'debug',
      format: combine(timestamp(), logFormat),
    }),
  );
}

// Add console logging for development
if (isDevelopment) {
  logger.add(
    new transports.Console({
      format: combine(format.colorize(), logFormat),
    }),
  );
}

export default logger;
