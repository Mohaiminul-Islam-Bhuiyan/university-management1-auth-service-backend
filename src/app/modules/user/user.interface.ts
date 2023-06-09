// 1. Create an interface representing a document in MongoDB.

import { Model } from 'mongoose'

export type IUser = {
  id: string
  role: string
  password: string
}

export type UserModel = Model<IUser, Record<string, unknown>>
