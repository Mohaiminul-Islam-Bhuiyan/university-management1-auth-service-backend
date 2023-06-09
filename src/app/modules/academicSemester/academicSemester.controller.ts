import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { paginationFields } from '../../../constants/pagination'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { academicSemesterFilterableFields } from './academicSemester.constant'
import { IAcademicSemester } from './academicSemester.interface'
import { AcademicSemesterService } from './academicSemester.service'

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // req validation

    const { ...academicSemesterData } = req.body
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    )

    // res.status(200).json({
    //   success: true,
    //   message: 'academic semester created successfully',
    //   data: result,
    // })
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'academic semester created successfully',
      data: result,
    })
    next()
  }
)

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, academicSemesterFilterableFields)
    const paginationOptions = pick(req.query, paginationFields)

    const result = await AcademicSemesterService.getAllSemesters(
      filters,
      paginationOptions
    )

    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'semestrs retreived successfully',
      meta: result.meta,
      data: result.data,
    })
    next()
  }
)

const getSingleSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const result = await AcademicSemesterService.getSingleSemester(id)

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'semestrs retreived successfully',
      data: result,
    })
    next()
  }
)

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
}
