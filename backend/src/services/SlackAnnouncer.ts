import fetch from 'node-fetch'
import { challenges } from '../challenges'

export class SlackAnnouncer {
  constructor (
    private webhookUrl?: string
  ) {}

  async notify (challengeId: string, player: string, score: number) {
    if (!this.webhookUrl) {
      return false
    }

    const challenge = challenges.find(x => x.id === challengeId)!
    const message = `*${player}* just scored _${score}_ on *${challenge.title}*`
    try {
      await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          text: message
        }),
      })
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }
}
