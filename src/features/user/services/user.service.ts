import { IBasicInfo, IUserDocument } from "../interfaces/user.interface";
import { UserModel } from "../models/user.schema";
import { Util } from "@root/shared/utils/util";

class UserService {

    public async addUserData(data: IUserDocument): Promise<void> {
        await UserModel.create(data)
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
        return (await UserModel.findOne({ _id: userId }).exec()) as IUserDocument
    }

    public async getUserByPasswordToken(token: string): Promise<IUserDocument> {
        const user: IUserDocument = (await UserModel.findOne({
            passwordResetToken: token,
            passwordResetExpires: { $gt: Date.now() }
        }).exec()) as IUserDocument;
        return user;
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

}

export const userService: UserService = new UserService()