import express from 'express'
import apiRouter from './api'

const app = express()

app.use('/api', apiRouter)

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`🏌️  Listening on port ${port}`))
