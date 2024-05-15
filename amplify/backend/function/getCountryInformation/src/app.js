/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["RDS_HOST","RDS_PASSWORD","RDS_USER"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	RDS_DBNAME
	RDS_PORT
Amplify Params - DO NOT EDIT */
const express = require("express");
const connectToDB = require("./db");
connectToDB();
const handleError = require("./error");
const routes = require("./router");

const app = express();
app.use(express.json());
app.use("/", routes);

app.use(handleError);

module.exports = app;
