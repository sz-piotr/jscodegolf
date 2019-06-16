import Knex from 'knex'
import { ChallengeService } from './ChallengeService'
import { SolutionCheckerService } from './SolutionCheckerService'
import { SlackAnnouncer } from './SlackAnnouncer'

export function setup(database: Knex) {
  const solutionCheckerService = new SolutionCheckerService()
  const slackAnnouncer = new SlackAnnouncer(process.env.SLACK_WEBHOOK)
  const challengeService = new ChallengeService(
    database,
    solutionCheckerService,
    slackAnnouncer,
  )

  return {
    challengeService,
    slackAnnouncer,
  }
}

export type Services = ReturnType<typeof setup>
