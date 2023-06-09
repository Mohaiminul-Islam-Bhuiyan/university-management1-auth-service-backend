import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { UserService } from './user.service'

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // req validation

    const { user } = req.body
    const result = await UserService.createUser(user)

    // res.status(200).json({
    //   success: true,
    //   message: 'user created successfully',
    //   data: result,
    // })
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully',
      data: result,
    })
    next()
  }
)

export const UserController = {
  createUser,
}