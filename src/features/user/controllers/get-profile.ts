// import { Request, Response } from "express";
// import HTTP_STATUS from 'http-status-codes';
// import { userService } from "../services/user.service";
// import { IAllUsers } from "../interfaces/user.interface";

// const PAGE_SIZE = 12

// interface IUserAll {
//     newSkip: number;
//     limit: number;
//     skip: number;
//     userId: string
// }

// export class Get {
//     public async all(req: Request, res: Response): Promise<void> {
//         const { page } = req.params
//         const skip: number = (parseInt(page) - 1 * PAGE_SIZE)
//         const limit: number = PAGE_SIZE * parseInt(page)
//         const newSkip: number = skip === 0 ? skip : skip + 1
//         const allUsers = await Get.prototype.allUsers({
//             newSkip,
//             limit,
//             skip,
//             userId: `${req.currentUser!.userId}`
//         })
//         res.status(HTTP_STATUS.OK).json({ message: 'Get users', users: allUsers.users, totalUsers: allUsers.totalUsers })
//     }

//     private async allUsers({ newSkip, limit, skip, userId }: IUserAll): Promise<IAllUsers> {

//     }
// }