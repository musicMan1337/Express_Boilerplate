require('dotenv').config();
const path = require('path');
const { format, transports, createLogger } = require('winston');

const { NODE_ENV } = require('../../src/config/envConfig');

const fileFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.json()
);

const consoleFormat = format.combine(
  format.colorize({ colors: { info: 'blue' } }),
  format.timestamp({ format: 'HH:mm:ss' }),
  format.align(),
  format.printf((info) => `${info.timestamp} - ${info.level}: ${info.message}`)
);

// create levels to generate unique transports
const levels = ['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'];

const generateTransports = levels.map((level) => {
  const filter = format((info) => (info.level === level ? info : false));

  return new transports.File({
    filename: path.join(__dirname, `logs/${level}.log`),
    level,
    maxsize: 5000,
    format: format.combine(filter(), fileFormat)
  });
});

const logger = createLogger({
  transports: generateTransports
});

if (NODE_ENV === 'development') {
  logger.add(
    new transports.Console({
      level: 'http',
      format: consoleFormat
    })
  );
}

module.exports = logger;
