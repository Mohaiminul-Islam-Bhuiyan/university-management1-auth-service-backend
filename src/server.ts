import mongoose from 'mongoose'
import conf from './config/index'
import app from './app'

async function bootstrap() {
  try {
    await mongoose.connect(conf.database_url as string)
    console.log('data base connection established')

    app.listen(conf.port, () => {
      console.log(`Example app listening on port ${conf.port}`)
    })
  } catch (error) {
    console.log('failed to connect', error)
  }
}

bootstrap()
