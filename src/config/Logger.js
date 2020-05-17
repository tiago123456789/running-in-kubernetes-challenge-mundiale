import winston from "winston";

const logger = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { time: new Date() },
  transports: [
    new winston.transports.File({
      filename: __dirname + '/../../logs/error.log', level: 'error'
    }),
    new winston.transports.File({ 
      filename: __dirname + `/../../logs/${process.env.ENV}.log`, level: 'info'
    })
  ]
});


logger.stream = {
  write: function (message) {
    logger.info(message);
  }
};

const isProduction = process.env.ENV == "prod";
if (!isProduction) {
  logger.add(new winston.transports.Console({ level: 'debug' }));
}



export default logger;