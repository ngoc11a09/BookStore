import mongoose from "mongoose";
import { IPublisherDocument } from "@publisher/publisher.interface";
import { PublisherModel } from "@publisher/publisher.model";

class PublisherService {
    public async addPublisher(data: IPublisherDocument): Promise<void> {
        await PublisherModel.create(data)
    }
    public async getPublisherByCode(code: string): Promise<IPublisherDocument> {
        return (await PublisherModel.findOne({ code: code }).exec()) as IPublisherDocument
    }

    public async getPublisherById(id: string): Promise<IPublisherDocument> {
        return (await PublisherModel.findById(id).exec()) as IPublisherDocument
    }

    public async updatePublisher(id: string, info: IPublisherDocument): Promise<void> {
        const _id = new mongoose.Types.ObjectId(id)
        await PublisherModel.findByIdAndUpdate(_id, {
            code: info['code'],
            name: info['name'],
            address: info['address']
        }).exec()
    }

    public async getAll(): Promise<IPublisherDocument[]> {
        return await PublisherModel.find({}) as IPublisherDocument[]
    }
    public async deletePublisher(id: string): Promise<void> {
        const _id = new mongoose.Types.ObjectId(id)
        await PublisherModel.deleteOne({ _id }).exec()
    }

    public async deleteAllPublishers(): Promise<number> {
        const res = await PublisherModel.deleteMany().exec()

        return res.deletedCount
    }
}

export const publisherService: PublisherService = new PublisherService()