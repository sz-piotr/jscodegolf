import express from 'express'
import Knex from 'knex'
import path from 'path'
import { router } from './routes'
import { setup } from './services'
import { errorHandler } from './util/errorHandler'
import bodyParser from 'body-parser'

const FRONTEND_FILES = path.join(__dirname, '../../frontend/dist')
const MIGRATIONS_DIR = path.join(__dirname, '../migrations')
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/jscodegolf'
const PORT = process.env.PORT || 3000

async function start() {
  const database = Knex({
    client: 'pg',
    connection: DATABASE_URL,
    migrations: {
      directory: MIGRATIONS_DIR,
    },
  })
  await database.migrate.latest()

  const services = setup(database)

  const app = express()

  app.enable('trust proxy')
  app.use(function (req, res, next) {
    if (req.secure || req.hostname === 'localhost') {
      next()
    } else {
      res.redirect('https://' + req.headers.host + req.url)
    }
  })

  app.use(bodyParser.json())
  app.use('/', router(services))
  app.use('/', express.static(FRONTEND_FILES))
  app.use(errorHandler)

  app.listen(PORT, () => console.log(`🏌️  Listening on port ${PORT}`))
}

start()
