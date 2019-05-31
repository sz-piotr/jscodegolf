import Knex from 'knex'

export interface Challenge {
  id: number
  title: string
  description: string
}

export class ChallengeStorage {
  constructor(private database: Knex) { }

  async getChallenges() {
    return await this.database
      .select('*')
      .from('challenge')
  }
}
