import Knex from 'knex'
import { challenges } from '../challenges'

export interface ApiChallenge {
  id: string
  title: string
  description: string
}

export interface ApiScore {
  player: string
  score: number
  time: Date
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

  async getScores(challenge: string): Promise<ApiScore[]> {
    return this.database('scores')
      .select('player', 'score', 'time')
      .where('challenge', challenge)
  }

  async addScore(challenge: string, player: string, solution: string) {

  }
}
