import { IBookDocument } from "@book/interfaces/book.interface";
import { BookModel } from "@book/models/book.model";
import mongoose from "mongoose";

class BookService {
    public async addBook(data: IBookDocument): Promise<void> {
        await BookModel.create(data)
    }
    public async getBookByCode(code: string): Promise<IBookDocument> {
        return (await BookModel.findOne({ code: code }).exec()) as IBookDocument
    }

    public async getBookById(id: string): Promise<IBookDocument> {
        return (await BookModel.findById(id).exec()) as IBookDocument
    }

    public async updateBookInfo(id: string, info: IBookDocument): Promise<void> {
        const _id = new mongoose.Types.ObjectId(id)
        await BookModel.findByIdAndUpdate(_id, {
            code: info['code'],
            title: info['title'],
            price: info['price'],
            publishYear: info['publishYear'],
            publishCode: info['publishCode'],
            author: info['author']
        }).exec()
    }

    public async getAll(): Promise<IBookDocument[]> {
        return await BookModel.find({}) as IBookDocument[]
    }
}

export const bookService: BookService = new BookService()