import { Model, Schema, model } from "mongoose";
import { IPublisherDocument } from "./publisher.interface";

const publisherSchema: Schema = new Schema({
    code: { type: String, default: '' },
    name: { type: String, default: '' },
    address: { type: String, default: '' }
}, {
    timestamps: true,
})

const PublisherModel: Model<IPublisherDocument> = model<IPublisherDocument>('Publisher', publisherSchema, 'Publisher')
export { PublisherModel }