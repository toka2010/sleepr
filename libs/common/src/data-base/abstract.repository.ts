import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
    abstract readonly logger:Logger;
  constructor(protected readonly _model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>) {
    const createdDocument = new this._model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON();
  }

  async findOne(filterQuery: FilterQuery<TDocument>) {
    const document = await this._model.findOne(filterQuery, {}, { lean: true });
    if (!document) {
        this.logger.warn('this document is not found');
      throw new NotFoundException('this document is not found');
    }
    return document;
  }

  async find(filterQuery: FilterQuery<TDocument>) {
    return this._model.find(filterQuery, {}, { lean: true });
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    updateQuery: UpdateQuery<TDocument>,
  ) {
    const updatedDocument = await this._model.findOneAndUpdate(
      filterQuery,
      updateQuery,
      { lean: true, new: true },
    );
    if (!updatedDocument) {
        this.logger.warn('this document is not found');
      throw new NotFoundException('this document is not found');
    }
    return updateQuery;
  }

  async findOneAndDelete(filterQuery: FilterQuery<TDocument>) {
    return this._model.findOneAndDelete(filterQuery,{lean:true});
  }
}
