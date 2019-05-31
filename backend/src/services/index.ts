import Knex from 'knex'
import { ChallengeStorage } from './ChallengeStorage'

export function setup(database: Knex) {
  const challengeStorage = new ChallengeStorage(database)

  return {
    challengeStorage,
  }
}

export type Services = ReturnType<typeof setup>
