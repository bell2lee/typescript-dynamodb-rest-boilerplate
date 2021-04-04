import { DateTime } from 'luxon';
import ReadWriteRepository from './read-write-repository';

export default abstract class TimestampRepository<T> extends ReadWriteRepository<T> {
  protected constructor(
    protected tableName: string,
    protected schema: any,
  ) {
    super(tableName, schema);
  }

  async put(key: any, args: any) {
    await super.put(key, {
      ...args,
      createdAt: DateTime.now().toMillis(),
    });
  }
}
