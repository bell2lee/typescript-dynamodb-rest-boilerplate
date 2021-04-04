type KeyValueString = { [key: string]: string };

const alpha: string[] = Array.from({ length: 26 }, (v, i) => String.fromCharCode(i + 97));
export const createAlias = (keys: string[]) => keys
  .map((key, index) => ({
    [key]: alpha[index],

  }))
  .reduce((x, y) => ({ ...x, ...y }));

export const createUpdateExpression = (aliasData: KeyValueString) => `set ${Object.entries(aliasData)
  .map(([field, alias]) => (`${field} = :${alias}`))
  .join(', ')}`;

export const createExpressionAttributeValues = (aliasData: KeyValueString, updateValues: KeyValueString) => Object
  .entries(aliasData)
  .map(([field, alias]) => ({ [`:${alias}`]: updateValues[field] }))
  .reduce((x, y) => ({ ...x, ...y }));
