import { IGenericErrorMessage } from './error'

export type IGenericResponse = {
  statusCode: number
  message: string
  errorMessages: IGenericErrorMessage[]
}

export type IGenericPaginationResponse<T> = {
  meta: {
    page?: number
    limit?: number
    total?: number
  }
  data: T
}
