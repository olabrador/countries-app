const { Client } = require("pg");
const aws = require("aws-sdk");
const log = require("../logging");
const handleError = require("../error");

async function getSecrets() {
  log("getSecrets::getting secrets");
  const { Parameters } = await new aws.SSM()
    .getParameters({
      Names: ["RDS_HOST", "RDS_USER", "RDS_PASSWORD"].map(
        (secretName) => process.env[secretName]
      ),
      WithDecryption: true,
    })
    .promise();
  log("getSecrets::Parameters", JSON.stringify(Parameters, undefined, 2));
  return {
    host: Parameters.find((p) => p.Name === process.env.RDS_HOST).Value,
    username: Parameters.find((p) => p.Name === process.env.RDS_USER).Value,
    password: Parameters.find((p) => p.Name === process.env.RDS_PASSWORD).Value,
  };
}

let client;
async function connectToDB() {
  try {
    log("connectToDB::connecting to db");
    if (client) {
      log("connectToDB::already connected, return client");
      return client;
    }
    const { host, username, password } = await getSecrets();
    client = new Client({
      host: host,
      port: parseInt(process.env.RDS_PORT, 10) || 5432,
      user: username,
      password: password,
      database: process.env.RDS_DBNAME || "countries",
    });
    
    client.connect();
    log("connectToDB::connected to db");
    return client;
  } catch (error) {
    console.error("Error connecting to db", error);
    handleError(error);
  }
}

module.exports = connectToDB;
