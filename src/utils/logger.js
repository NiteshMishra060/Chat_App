const fs = require('fs');
const path = require('path');
const { createLogger, format, transports } = require('winston');

//  Ensure logs directory exists
const logDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    //  Console output
    new transports.Console(),

    //  File logging
    new transports.File({ filename: path.join(logDir, 'app.log') })
  ]
});

module.exports = logger;
