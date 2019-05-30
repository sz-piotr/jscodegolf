import { Router } from 'express'
import { asyncHandler } from './util/asyncHandler';

const router = Router()

router.get('/challenges', asyncHandler(
  () => [
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
  ],
))

router.get('/scores/:challenge', async (req, res) => {
  res.json([
    {
      name: 'Helen',
      score: 30 + req.params.challenge,
    },
    {
      name: 'Lucy',
      score: 31 + req.params.challenge * 2,
    },
    {
      name: 'Martin',
      score: 34 + req.params.challenge * 3,
    }
  ])
})


export default router
