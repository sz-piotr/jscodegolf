import { Router } from 'express'
import { Services } from 'src/services'
import { apiRouter } from './api'

export function router (services: Services) {
  const router = Router()
  router.use('/', apiRouter(services.challengeStorage))
  return router
}
