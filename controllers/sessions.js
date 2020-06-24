var docClient = require("../model/db");

async function getSessionsByEmail(email) {
  var params = {
    TableName: "PlanningPoker.Sessions",
    IndexName: "email-index",
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: { ":email": email },
  };

  try {
    const data = await docClient.query(params).promise();
    const sessions = [...data.Items]; // Shallow copy is fine.
    return { sessions: sessions };
  } catch (err) {
    console.log("Failure", err.message);
    return { error: err.message };
  }
}
module.exports = getSessionsByEmail;
