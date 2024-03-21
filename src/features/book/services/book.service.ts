import { IBookDocument } from "../interfaces/book.interface";
import { BookModel } from "../models/book.model";

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
        await BookModel.findByIdAndUpdate(id, {
            $set: {
                code: info['code'],
                title: info['title'],
                price: info['price'],
                publishYear: info['publishYear'],
                publishCode: info['publishCode'],
                author: info['author']
            }
        })
    }

    public async getAll(): Promise<IBookDocument[]> {
        return await BookModel.find({}) as IBookDocument[]
    }
}

export const bookService: BookService = new BookService()