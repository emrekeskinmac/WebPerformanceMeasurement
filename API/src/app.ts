import "./controllers/Collect/collect";
import "./controllers/Seed/seed";

import * as bodyparser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as mongoose from "mongoose";
import * as swaggerUi from "swagger-ui-express";
var fs = require('fs');
var https = require('https');

import { RegisterRoutes } from "./routes";
let config = require('./config')
const swagger = require("../swagger.json");

mongoose.connect(
  config.Mongo.url,
  { useNewUrlParser: true }
);
mongoose.set('useFindAndModify', false);

var privateKey = fs.readFileSync('key.key');
var certificate = fs.readFileSync('cert.crt');

var credentials = {key: privateKey, cert: certificate};

let app = express();

app.use(cors());

app.get('/swagger/swagger.json', (req, res) => {
  res.send(swagger);
});

app.use(bodyparser.json());
RegisterRoutes(app);

try {
  const swaggerDocument = require('../swagger.json');
  var options = {
    explorer: true,
    "developerName": "Emre Keskin",
    "developerEmail": "me@emrekesk.in",
    "developerOrganization": "Tech",
    "developerOrganizationUrl": "http://emrekesk.in",
    "licenseName": "MIT",
  };
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
} catch (err) {
  console.error('Unable to read swagger.json', err);
}

var httpsServer = https.createServer(credentials, app);
httpsServer.listen(config.Port);

console.info(`Server is up -- https://127.0.0.1:${config.Port}/swagger`);

export { app };
