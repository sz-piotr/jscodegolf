import { Router } from 'express'
import { asyncHandler, responseOf } from './util/asyncHandler'
import { sanitize, asNumber } from './util/validate'
import { Services } from './services';

export function apiRouter(services: Services) {
  const router = Router()

  router.get('/challenges', asyncHandler(
    async () => responseOf(await services.challengeStorage.getChallenges()),
  ))

  router.get('/scores/:challenge', asyncHandler(
    sanitize({
      challenge: asNumber,
    }),
    ({ challenge }) => responseOf([
      {
        name: 'Helen',
        score: 30 + challenge,
      },
      {
        name: 'Lucy',
        score: 31 + challenge * 2,
      },
      {
        name: 'Martin',
        score: 34 + challenge * 3,
      }
    ]),
  ))

  return router
}
