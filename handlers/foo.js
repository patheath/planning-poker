const AWS = require('aws-sdk')

function putItem(data, callback) {

    AWS.config.update({
        region: "us-west-2",
        endpoint: "http://localhost:8000"
    });

    const docClient = new AWS.DynamoDB.DocumentClient()

    var params = {
        TableName: 'Sessions',
        Item: {
            id: '001',
            email: 'test@test.com'
        }
    }

    docClient.put(params, function (err, data) {
        if (err) console.log(err)
        else { 
            console.log("insert complete..");
            result = { id: params.Item.id};
            callback(result);
        }
    });
}

module.exports = putItem;