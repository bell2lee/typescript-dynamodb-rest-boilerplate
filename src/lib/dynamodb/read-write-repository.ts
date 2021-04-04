import Joi, { AnySchema } from 'joi';
import { create } from 'ts-node';
import { docClient } from './config';
import * as expressionLib from './create-expression';

export default abstract class ReadWriteRepository<T> {
  protected constructor(
    protected tableName: string,
    protected schema: AnySchema,
  ) {}

  async put(key: any, args: any): Promise<void> {
    const result = await this.schema.validate({
      ...args,
      ...key,
    });

    await docClient.put({
      TableName: this.tableName,
      Item: {
        ...args,
        ...key,
      },
    }).promise();
  }

  async get(key: any): Promise<T | null> {
    const { Item } = await docClient.get({
      TableName: this.tableName,
      Key: key,
    }).promise();
    return Item as T ?? null;
  }

  async delete(key: any): Promise<void> {
    await docClient.delete({
      TableName: this.tableName,
      Key: key,
    }).promise();
  }

  async update(key: any, args: {[key: string]: any}): Promise<void> {
    const aliasData = expressionLib.createAlias(Object.keys(args));
    const updateExpression = expressionLib.createUpdateExpression(aliasData);
    const expressionAttributeValues = expressionLib.createExpressionAttributeValues(aliasData, args);
    console.log(updateExpression);
    await docClient.update({
      TableName: this.tableName,
      Key: key,
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'UPDATED_NEW',
    }).promise();
  }

  async findItems(): Promise<T[] | null> {
    return null;
  }
}
