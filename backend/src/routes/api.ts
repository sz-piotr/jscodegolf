import { Router } from 'express'
import { ChallengeService } from 'src/services/ChallengeService'
import { asyncHandler, responseOf } from '../util/asyncHandler'
import { sanitize, asString, asObject } from '../util/sanitize'

export function apiRouter(challengeService: ChallengeService) {
  const router = Router()

  router.get('/api/challenges', asyncHandler(
    async function () {
      const result = await challengeService.getChallenges()
      return responseOf(result)
    },
  ))

  router.get('/api/scores/:challenge', asyncHandler(
    sanitize({
      challenge: asString,
    }),
    async function ({ challenge }) {
      const result = await challengeService.getScores(challenge)
      return responseOf(result)
    },
  ))

  router.post('/api/scores/:challenge', asyncHandler(
    sanitize({
      challenge: asString,
      body: asObject({
        player: asString,
        solution: asString,
      })
    }),
    async function ({ challenge }) {
      const result = await challengeService.getScores(challenge)
      return responseOf(result, 201)
    },
  ))

  return router
}
