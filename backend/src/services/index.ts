import Knex from 'knex'
import { ChallengeService } from './ChallengeService'

export function setup(database: Knex) {
  const challengeStorage = new ChallengeService(database)

  return {
    challengeStorage,
  }
}

export type Services = ReturnType<typeof setup>
