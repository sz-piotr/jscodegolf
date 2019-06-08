import Knex from 'knex'
import { challenges } from '../challenges'
import { NotFound } from '../util/errors';
import { SolutionCheckerService } from './SolutionCheckerService';

export interface ApiChallenge {
  id: string
  title: string
  description: string
  example: any[],
}

export interface ApiScore {
  player: string
  score: number
  time: string
}

export class ChallengeService {
  constructor(private database: Knex, private checker: SolutionCheckerService) { }

  getChallenges(): ApiChallenge[] {
    return challenges.map(challenge => ({
      id: challenge.id,
      title: challenge.title,
      description: challenge.description,
      example: challenge.tests[0].args,
    }))
  }

  async getScores(challenge: string): Promise<ApiScore[]> {
    return this.database
      .select('t.player', 't.score', 't.time')
      .from(
        this.database
          .select('player')
          .from('scores')
          .min('score as score')
          .where('challenge', challenge)
          .groupBy('player')
          .as('m')
      )
      .innerJoin('scores as t', function () {
        this
          .on('t.player', 'm.player')
          .andOn('t.score', 'm.score')
      })
      .where('challenge', challenge)
  }

  async addScore(challengeId: string, player: string, solution: string) {
    const challenge = challenges.find(ch => ch.id === challengeId)
    if (!challenge) {
      throw new NotFound()
    }

    const isValid = this.checker.check(solution, challenge);
    if (!isValid) {
      return {
        success: false,
        error: 'Solution did not pass some of the tests.',
      }
    }

    await this.database('scores')
      .insert({
        challenge: challengeId,
        player,
        score: solution.length,
      })

    return {
      success: true,
      scores: await this.getScores(challengeId),
    }
  }
}
