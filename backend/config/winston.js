import { createLogger, transports, addColors, format } from 'winston';

const { combine, timestamp, colorize, printf, json, errors, prettyPrint } =
  format;

// nivel de erros
const logLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    sql: 3,
    http: 4,
    debug: 5
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    sql: 'purple',
    http: 'magenta',
    debug: 'white'
  }
};

// Adiciona as cores ao Logger
addColors(logLevels.colors);

// Formatador por defenição
const logFormat = combine(timestamp(), json());

// Formatador Pretty de erros
const allFormat = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  errors({ stack: true }),
  prettyPrint()
);

// Formatador de Consola
const consoleFormat = combine(
  colorize({ all: true }),
  printf((info) => `${info.level}: ${info.message}`)
);

// Define os Transportadores
const logTransports = [
  new transports.File({ filename: 'logs/error.log', level: 'warn' }),
  new transports.File({ filename: 'logs/all.log', level: 'debug' }),
  new transports.File({
    filename: 'logs/pretty.log',
    level: 'warn',
    format: allFormat
  })
];

/**
 * Logger de Erros e Infos
 */
const logger = createLogger({
  levels: logLevels.levels,
  format: logFormat,
  transports: logTransports,
  exceptionHandlers: [
    new transports.File({ filename: 'logs/handlers/exceptions.log' })
  ],
  rejectionHandlers: [
    new transports.File({ filename: 'logs/Handlers/rejections.log' })
  ],
  exitOnError: false
});

// Adiciona o Logger de Consola no Desenvolvimento
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({ format: consoleFormat }));
}

export default logger;
