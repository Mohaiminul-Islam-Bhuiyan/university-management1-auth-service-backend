import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
// import { UserController } from './user.controller'
import { AcademicSemesterController } from './academicSemester.controller'
import { AcademicSemesterValidation } from './academicSemester.validation'

const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
)

router.get('/:id', AcademicSemesterController.getSingleSemester)

router.get('/', AcademicSemesterController.getAllSemesters)

export const AcademicSemesterRoutes = router