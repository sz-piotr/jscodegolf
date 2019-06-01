import Knex from 'knex'
import { challenges } from '../challenges'

export interface ApiChallenge {
  id: string
  title: string
  description: string
}

export class ChallengeService {
  constructor(private database: Knex) { }

  getChallenges(): ApiChallenge[] {
    return challenges.map(challenge => ({
      id: challenge.id,
      title: challenge.title,
      description: challenge.description,
    }))
  }
}
