const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
    let body;
    let statusCode = 200;
    const headers = {
        "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
        "Access-Control-Allow-Origin": "https://localhost:3000,https://blog.b-blue.dev",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
    };
    
try {
	switch (event.routeKey) {
	    
  	case "DELETE /articles/{id}":
    	await dynamo
      	.delete({
        	TableName: "I3Blog",
        	Key: {
          	Id: event.pathParameters.id
        	}
      	})
      	.promise();
    	body = `Deleted article ${event.pathParameters.id}`;
    	break;
    	
  	case "GET /articles/{id}":
    	body = await dynamo
      	.get({
        	TableName: "I3Blog",
        	Key: {
          	Id: event.pathParameters.id
        	}
      	})
      	.promise();
    	break;
    	
    	
  	case "GET /articles":
    	body = await dynamo.scan({ TableName: "I3Blog" }).promise();
    	break;
    	
  	case "PUT /articles":
    	let requestJSON = JSON.parse(event.body);
    	await dynamo
      	.put({
        	TableName: "I3Blog",
        	Item: {
          	Id: requestJSON.Id,
          	Title: requestJSON.Title,
          	Author: requestJSON.Author, 
          	PublicationDate: requestJSON.PublicationDate,
          	Body: requestJSON.Body,
          	Pic: requestJSON.Pic
        	}
      	})
      	.promise();
    	body = `Article successfully submitted!`;
    	break;
    	
  	default:
    	throw new Error(`Unsupported route: "${event.routeKey}"`);
	}
	
  } catch (err) {
	statusCode = 400;
	body = err.message;
	
  } finally {
	body = JSON.stringify(body);
  }

  return {
	statusCode,
	body,
	headers
  };
};