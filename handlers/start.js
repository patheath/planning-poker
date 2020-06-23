//import { v4 as uuidv4 } from 'uuid';
var UUIDV4 = require("uuid");
var AWS = require("aws-sdk");

function start(emails) {
  AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
  });

  var docClient = new AWS.DynamoDB.DocumentClient();

  const sessionId = UUIDV4.v4();
  //const sessionId = ""; // for testing
  const errors = [];

  var table = "PlanningPoker.Sessions";

  emails.forEach((email) => {
    var params = {
      TableName: table,
      Item: {
        id: sessionId,
        email: email,
      },
    };

    console.log("Adding a new item...", params);

    docClient.put(params, function (err, data) {
      if (err) console.log(err);
      else console.log(data);
    });
  });

  return sessionId;
}

module.exports = start;
