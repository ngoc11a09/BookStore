import mongoose from "mongoose";
import { IBasicInfo, IUserDocument } from "../interfaces/user.interface";
import { UserModel } from "../models/user.schema";
import { ObjectId } from "mongodb";
import { IAuthDocument } from "@root/features/auth/interfaces/auth.interface";
import { AuthModel } from "@root/features/auth/models/auth.schema";
import { Util } from "@root/shared/utils/util";

class UserService {

    private aggregateProject() {
        return {
            _id: 1,
            username: '$authId.username',
            uId: '$authId.uId',
            email: '$authId.email',
            createdAt: "$authId.createdAt",
            updatedAt: "$authId.updatedAt",
            borrowed: 1,
            name: 1,
            lastName: 1,
            phone: 1,
            address: 1,
            sex: 1,
            birthday: 1
        }
    }

    public async addUserData(data: IUserDocument): Promise<void> {
        await UserModel.create(data)
    }

    public async getUserByUsernameEmail(username: string, email: string): Promise<IUserDocument> {
        const query = {
            $or: [{ username: username }, { email: Util.lowerCase(email) }]
        }
        const user: IUserDocument = (await UserModel.findOne(query).exec()) as IUserDocument
        return user
    }

    public async updatePassword(username: string, hashedPassword: string): Promise<void> {
        await UserModel.updateOne({ username }, { $set: { password: hashedPassword } }).exec()
    }

    public async updateUserInfo(userId: string, info: IBasicInfo): Promise<void> {
        await UserModel.updateOne({ _id: userId }, {
            $set: {
                address: info['address'],
                sex: info['sex'],
                name: info['name'],
                lastName: info['lastName'],
                phone: info['phone']
            }
        }).exec()
    }

    public async getUserByAuthId(authId: string): Promise<IUserDocument> {
        // console.log({ authId });
        const user: IUserDocument[] = await UserModel.aggregate(
            //     [
            //     { $match: { authId: new mongoose.Types.ObjectId(authId) } },
            //     { $lookup: { from: 'Auth', localField: 'authId', foreignField: '_id', as: 'authId' } },
            //     { $unwind: '$authId' },
            //     { $project: this.aggregateProject() }
            // ]
        )
        return user[0]
    }
}

export const userService: UserService = new UserService()