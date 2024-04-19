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
        console.log(info);

        await BookModel.findByIdAndUpdate(_id, {
            code: info['code'],
            title: info['title'],
            price: info['price'],
            publishYear: info['publishYear'],
            publishCode: info['publishCode'],
            author: info['author'],
            quantity: info['quantity']
        }).exec()
    }

    public async getAll(): Promise<IBookDocument[]> {
        return await BookModel.find({}) as IBookDocument[]
    }
    public async deleteBook(id: string): Promise<void> {
        const _id = new mongoose.Types.ObjectId(id)
        await BookModel.deleteOne({ _id }).exec()
    }

    public async deleteAllBooks(): Promise<number> {
        const res = await BookModel.deleteMany().exec()

        return res.deletedCount
    }
}

export const bookService: BookService = new BookService()