var UUIDV4 = require("uuid");
var docClient = require("../model/db");

async function start(emails) {
  const sessionId = UUIDV4.v4();
  var table = "PlanningPoker.Sessions";
  let errors = [];

  emails.forEach(async (email) => {
    var params = {
      TableName: table,
      Item: {
        id: sessionId,
        email: email,
      },
    };

    const { data, err } = await docClient.put(params).promise();
    if (err) {
      errors.push(err.message);
    }
  });

  return { sessionId, errors };
}

module.exports = start;
