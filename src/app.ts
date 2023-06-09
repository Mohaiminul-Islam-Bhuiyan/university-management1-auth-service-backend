import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import routes from './app/routes'

const app: Application = express()
app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application routes

// app.use('/api/v1/users', UserRoutes)
// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes)
app.use('/api/v1/', routes)

// testing

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   //   throw new Error('ore baba error')
//   //   throw new ApiError(400, 'khaise api error')
//   // next('ore baba error')
//   Promise.reject(new Error('unhandled promise rejection error'))
// })

// global error handler
app.use(globalErrorHandler)

// handle not found error
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'api not found',
      },
    ],
  })
  next()
})

export default app
