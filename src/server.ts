import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import conf from './config/index'
import logger from './shared/logger'

process.on('uncaughtException', error => {
  logger.errorlogger.error(error)
  process.exit(1)
})

let server: Server
async function bootstrap() {
  try {
    await mongoose.connect(conf.database_url as string)
    logger.logger.info('data base connection established')

    server = app.listen(conf.port, () => {
      logger.logger.info(`Example app listening on port ${conf.port}`)
    })
  } catch (error) {
    logger.errorlogger.error('failed to connect', error)
  }

  process.on('unhandledRejection', err => {
    console.log('unhandledRejection hoise')
    if (server) {
      server.close(() => {
        logger.errorlogger.error('server closed', err)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

bootstrap()

process.on('SIGTERM', () => {
  logger.logger.info('SIGTERM is detected')
  if (server) {
    server.close()
  }
})
