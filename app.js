const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const appSetup = require("./src/startup/init.js");
const routerSetup = require("./src/startup/router.js");
const securitySetup = require("./src/startup/security.js");

appSetup(app);
securitySetup(app, express);
routerSetup(app);
