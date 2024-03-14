const serverless = require("serverless-http");
const server = require("../../server");

export const handler = serverless(server);
