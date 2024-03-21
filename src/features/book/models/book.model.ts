import { Model, Schema, model } from "mongoose";
import { IBookDocument } from "../interfaces/book.interface";

const bookSchema: Schema = new Schema({
    code: { type: String, default: '' },
    title: { type: String, default: '' },
    price: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 },
    publishYear: { type: Number, default: Date.now() },
    publishCode: { type: String, default: '' },
    author: { type: String, default: '' }
}, {
    timestamps: true,
})

const BookModel: Model<IBookDocument> = model<IBookDocument>('Book', bookSchema, 'Book')
export { BookModel }