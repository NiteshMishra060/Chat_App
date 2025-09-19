// Import Mongoose
const mongoose = require('mongoose');
const logger=require('../utils/logger')
require("dotenv").config();
const chatApp=process.env.CHAT_APP_DB_NAME
// Connect MongoDB
logger.info("stablishing db chat app database connection")
mongoose.connect(process.env.MONGODB_URI, {
    dbName: chatApp
}).then(() => {
    console.log("** chat app Database Connected **");
    logger.info("** chat app Database Connected **")
}).catch((err) => {
    console.log(`Error while connecting the Database \n${err}`);
    logger.error(`Error while connecting the Database \n${err}`)
})