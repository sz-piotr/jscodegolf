import { Router } from 'express'
import { ChallengeService } from 'src/services/ChallengeService'
import { asyncHandler, responseOf } from '../util/asyncHandler'
import { sanitize, asString } from '../util/validate'

export function apiRouter(challengeService: ChallengeService) {
  const router = Router()

  router.get('/api/challenges', asyncHandler(
    async () => responseOf(await challengeService.getChallenges()),
  ))

  router.get('/api/scores/:challenge', asyncHandler(
    sanitize({
      challenge: asString,
    }),
    () => responseOf([
      {
        name: 'Helen',
        score: 30,
      },
      {
        name: 'Lucy',
        score: 31,
      },
      {
        name: 'Martin',
        score: 34,
      }
    ]),
  ))

  return router
}
