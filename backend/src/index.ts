import express from 'express'
import apiRouter from './api'

const app = express()

app.use('/api', apiRouter)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`🏌️  Listening on port ${port}`))
