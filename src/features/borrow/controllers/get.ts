import { Request, Response } from "express";
import HTTP_STATUS from 'http-status-codes';
import { borrowService } from "@borrow/borrow.service";

export class Get {
    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const borrows = await borrowService.getAll();
            res.status(HTTP_STATUS.OK).json(borrows);
        } catch (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Fail to get all borrows' })
        }
    }
    public async getOne(req: Request, res: Response): Promise<void> {
        try {
            const borrow = await borrowService.getBorrowById(req.params.id);
            res.status(HTTP_STATUS.OK).json(borrow);
        } catch (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Cannot get a borrow' })
        }
    }
    public async getByUserCode(req: Request, res: Response): Promise<void> {
        const code = req.body.userCode
        try {
            const borrow = await borrowService.getBorrowByUserCode(code)
            res.status(HTTP_STATUS.OK).json(borrow);
        } catch (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Cannot get a borrow' })
        }
    }
    public async getByAdminCode(req: Request, res: Response): Promise<void> {
        const code = req.body.adminCode
        try {
            const borrow = await borrowService.getBorrowByAdminCode(code)
            res.status(HTTP_STATUS.OK).json(borrow);
        } catch (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Cannot get a borrow' })
        }
    }
    public async getByBorrowedDay(req: Request, res: Response): Promise<void> {
        const day = req.body.borrowedDay
        try {
            const borrow = await borrowService.getBorrowByBorrowedDay(day)
            res.status(HTTP_STATUS.OK).json(borrow);
        } catch (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Cannot get a borrow' })
        }
    }
    public async getByReturnDay(req: Request, res: Response): Promise<void> {
        const day = req.body.returnDay
        try {
            const borrow = await borrowService.getBorrowByReturnDay(day)
            res.status(HTTP_STATUS.OK).json(borrow);
        } catch (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Cannot get a borrow' })
        }
    }
}