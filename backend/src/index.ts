import express from 'express'
import Knex from 'knex'
import { router } from './routes'
import { setup } from './services'
import { errorHandler } from './util/errorHandler'
import bodyParser from 'body-parser'

async function start() {
  const database = Knex({
    client: 'pg',
    connection: 'postgres://postgres@localhost:5432/jscodegolf',
  })
  await database.migrate.latest()

  const services = setup(database)

  const app = express()
  app.use(bodyParser.json())
  app.use('/', router(services))
  app.use(errorHandler)

  const port = process.env.PORT || 3000
  app.listen(port, () => console.log(`🏌️  Listening on port ${port}`))
}

start()
