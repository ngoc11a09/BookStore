import { IBasicInfo, IUserDocument } from "../interfaces/user.interface";
import { UserModel } from "@user/models/user.schema";
import { Util } from "@root/shared/utils/util";
import mongoose from "mongoose";

class UserService {

    public async addUserData(data: IUserDocument): Promise<void> {
        await UserModel.create(data)
    }

    public async getAllUsers(): Promise<IUserDocument[]> {
        return await UserModel.find({}) as IUserDocument[]
    }

    public async getUserByUsernameEmail(username: string, email: string): Promise<IUserDocument> {
        const query = {
            $or: [{ username: username }, { email: Util.lowerCase(email) }]
        }
        return (await UserModel.findOne(query).exec()) as IUserDocument
    }

    public async getUserByUsername(username: string): Promise<IUserDocument> {
        return (await UserModel.findOne({ username: username }).exec()) as IUserDocument
    }

    public async getUserByEmail(email: string): Promise<IUserDocument> {
        return (await UserModel.findOne({ email: Util.lowerCase(email) }).exec()) as IUserDocument
    }

    public async getUserById(userId: string): Promise<IUserDocument> {
        return (await UserModel.findById(userId).exec()) as IUserDocument
    }

    public async updateUserInfo(userId: string, info: IBasicInfo): Promise<void> {
        // console.log(userId);
        const _id = new mongoose.Types.ObjectId(userId)
        await UserModel.findOneAndUpdate({ _id: _id }, {
            address: info['address'],
            sex: info['gender'],
            name: info['name'],
            lastName: info['lastName'],
            phone: info['phone'],
            birthday: new Date(info['birthday'])
        }).exec()
    }

    public async deleteUserById(id: string): Promise<void> {
        const _id = new mongoose.Types.ObjectId(id)
        await UserModel.deleteOne({ _id }).exec()
    }

    public async deleteAllUsers(): Promise<number> {
        const res = await UserModel.deleteMany({ role: 'user' }).exec()

        return res.deletedCount
    }
}

export const userService: UserService = new UserService()