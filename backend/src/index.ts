import express from 'express'
import Knex from 'knex'
import { apiRouter } from './api'
import { setup } from './services';

async function start() {
  const database = Knex({
    client: 'pg',
    connection: 'postgres://postgres@localhost:5432/jscodegolf',
  })

  await database.migrate.latest()

  const services = setup(database)

  const app = express()

  app.use('/api', apiRouter(services))

  const port = process.env.PORT || 3000

  app.listen(port, () => console.log(`🏌️  Listening on port ${port}`))
}

start()
