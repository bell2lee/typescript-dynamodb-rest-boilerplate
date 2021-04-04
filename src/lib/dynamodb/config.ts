import AWS from 'aws-sdk';

export const docClient = new AWS.DynamoDB.DocumentClient();
export const client = new AWS.DynamoDB();
