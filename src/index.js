import express from "express";
import logger from "./utils/logger";
import db from "./database/tables";

const app = express();

require("./utils//endPoints")(app);
// require('./startup/logging')();
// require('./startup/config')()
// require('./database/tables')
db.createTableCustomer();
const port = process.env.PORT || 5000;
app.listen(port, () => logger.info(`listening to port ${port}`));
