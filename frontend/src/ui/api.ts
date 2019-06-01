export interface ApiChallenge {
  id: string,
  title: string,
  description: string,
}

export interface ApiScore {
  player: string
  score: number
  time: Date
}

export async function getChallenges(): Promise<ApiChallenge[]> {
  const res = await fetch('/api/challenges')
  return res.json()
}

export async function getScores(challengeId: string): Promise<ApiScore[]> {
  const res = await fetch(`/api/scores/${challengeId}`)
  return res.json()
}

export async function submitSolution(challengeId: string, solution: string) {
  const res = await fetch(`/api/scores/${challengeId}`, {
    method: 'POST',
    body: JSON.stringify({
      player: localStorage.getItem('name'),
      solution
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return res.json()
  if (Math.random() < 0.5) {
    return {
      success: true as const,
      scores: [
        {
          name: localStorage.getItem('name'),
          score: solution.length,
        },
        ...await getScores(challengeId)
      ] as ApiScore[]
    }
  } else {
    return {
      success: false as const,
      error: 'Something went wrong. The tests are failing.\nError at line 1:4'
    }
  }
}
