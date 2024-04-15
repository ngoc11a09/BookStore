import { Model, Schema, model } from "mongoose";
import { IUserDocument } from "../interfaces/user.interface";
import { compare, hash } from "bcrypt";

const userSchema: Schema = new Schema({
    name: { type: String, default: '' },
    lastName: { type: String, default: '' },
    role: { type: String, default: 'user' },
    birthday: { type: Date, default: new Date(1 / 1 / 2000) },
    gender: { type: String, default: 'unknow' },
    address: [{ type: String, default: '' }],
    phone: { type: String, default: '' },
    username: { type: String },
    uId: { type: String },
    email: { type: String },
    password: { type: String },
    position: { type: String, default: '' },
    refreshToken: { type: String, default: null }
},
    {
        timestamps: true,
        toJSON: {
            transform(_doc, ret) {
                delete ret.password;
                return ret;
            }
        }
    }
)

const SALT_ROUND = 10

userSchema.pre('save', async function (this: IUserDocument, next: () => void) {
    const hashedPassword: string = await hash(this.password as string, SALT_ROUND)
    this.password = hashedPassword
    next()
})

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    const hashedPassword: string = (this as unknown as IUserDocument).password!
    return compare(password, hashedPassword)
}

userSchema.methods.hashedPassword = async function (password: string): Promise<string> {
    return hash(password, SALT_ROUND)
}
const UserModel: Model<IUserDocument> = model<IUserDocument>('User', userSchema, 'User')
export { UserModel }