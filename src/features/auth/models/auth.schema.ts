import { Model, Schema, model } from "mongoose"
import { IAuthDocument } from "../interfaces/auth.interface";
import { hash, compare } from 'bcrypt';

const SALT_ROUND = 10

const authSchema: Schema = new Schema({
    username: { type: String },
    uId: { type: String },
    email: { type: String },
    password: { type: String },
    passwordResetToken: { type: String, default: '' },
    passwordResetExpires: { type: Number }
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

authSchema.pre('save', async function (this: IAuthDocument, next: () => void) {
    const hashedPassword: string = await hash(this.password as string, SALT_ROUND)
    this.password = hashedPassword
    next()
})

authSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    const hashedPassword: string = (this as unknown as IAuthDocument).password!
    return compare(password, hashedPassword)
}

authSchema.methods.hashedPassword = async function (password: string): Promise<string> {
    return hash(password, SALT_ROUND)
}

const AuthModel: Model<IAuthDocument> = model<IAuthDocument>('Auth', authSchema, 'Auth');
export { AuthModel };