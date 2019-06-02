import Knex from 'knex'
import { ChallengeService } from './ChallengeService'
import { SolutionCheckerService } from './SolutionCheckerService';

export function setup(database: Knex) {
  const solutionCheckerService = new SolutionCheckerService()
  const challengeStorage = new ChallengeService(database, solutionCheckerService)

  return {
    challengeStorage,
  }
}

export type Services = ReturnType<typeof setup>
