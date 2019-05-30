import { Router } from 'express'

const router = Router()

router.get('/challenges', async (req, res) => {
  res.json([
    {
      id: 0,
      title: 'Introduction',
      description: 'Write a function that returns true.\n' +
        'Multiline description is something very important and must be ' +
        'supported in order to allow for optimal experience.'
    },
    {
      id: 1,
      title: 'Format number',
      description: 'Write a function that formats the given number'
    },
    {
      id: 2,
      title: 'undefined',
      description: 'Write a function that deletes all undefined properties from an object'
    },
  ])
})

export default router
