import { Document, Model, FilterQuery } from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    return this.entityModel
      .findOne(entityFilterQuery, {
        _id: 0,
        _v: 0,
        ...projection,
      })
      .exec();
  }
  // can add projection too
  async find(entityFilterQuery: FilterQuery<T>): Promise<T | null> {
    return this.entityModel.find(entityFilterQuery);
  }
  async create();
}
