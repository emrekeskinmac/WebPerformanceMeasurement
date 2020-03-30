import { ObjectId } from "bson";
import * as mongoose from "mongoose";


export type ResourceDocument = mongoose.Document & {
  t: string,
  e: string,
  c: number,
  h: number
};

export type CollectDocument = mongoose.Document & {
  t: number,
  r: number,
  e: number,
  n: number,
  d: Array<ResourceDocument>,
  y: string,
  o: number,
  l: string,
};

const ResourceSchema = new mongoose.Schema({
  t: String,
  e: String,
  c: Number,
  h: Number
});

const CollectSchema = new mongoose.Schema({
  t: Number,
  r: Number,
  e: Number,
  n: Number,
  d: [ResourceSchema],
  y: String,
  o: Number,
  l: String,
}, { timestamps: true });

export const CollectRepository = {
  get table(): mongoose.Model<CollectDocument, {}> {
    return mongoose.model<CollectDocument>("Collect", CollectSchema);
  }
}