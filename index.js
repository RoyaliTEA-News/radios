import 'dotenv/config'
import express from 'express'
import * as Stations from './stations/index.js'

const app = express()
app.disable('x-powered-by')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  req.traceId = Date.now().toString(16) + ':' + Math.random().toString(16).substring(2, 14)
  res.header('X-Trace-Id', req.traceId)
  console.log(`[${req.traceId}] ${req.method} ${req.url}`)
  next()
})

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  res.send(`Welcome to the RoyaliTEA Radio API!\nTry /stations\n\nTrace: ${req.traceId}`)
})

app.get('/stations', (req, res) => {
  const { filter, limit } = req.query
  if (limit && isNaN(limit)) {
    res.status(400).json({ error: 'Invalid limit' })
    return
  }
  let filtered = {}
  if (!filter) {
    filtered = Stations
    if (limit) {
      filtered = Object.fromEntries(Object.entries(filtered).slice(0, limit))
    }
  }
  if (filter === 'name') {
    const { q } = req.query
    if (!q) {
      res.status(400).json({ error: 'Query parameter "q" is required with filter=name' })
      return
    }
    for (const [key, { metadata }] of Object.entries(Stations)) {
      if (!metadata) {
        continue
      }
      if (metadata.name.toLowerCase().includes(q.toLowerCase()) || metadata.aliases.some(alias => alias.toLowerCase().includes(q.toLowerCase()))) {
        filtered[key] = metadata
      }
      if (limit && Object.keys(filtered).length >= limit) {
        break
      }
    }
  }
  if (filter === 'tags') {
    const rawTags = req.query.tags
    if (!rawTags) {
      res.status(400).json({ error: 'Query parameter "tags" is required with filter=tags' })
      return
    }
    const tags = rawTags.split(',')
    if (!tags.length) {
      res.status(400).json({ error: 'Query parameter "tags" must be a comma-separated list' })
      return
    }
    for (const [key, value] of Object.entries(Stations)) {
      if (tags.every(tag => value.tags.includes(tag))) {
        filtered[key] = value
      }
      if (limit && Object.keys(filtered).length >= limit) {
        break
      }
    }
  }
  res.json(filtered)
})

app.get('/stations/:id', (req, res) => {
  const { id } = req.params
  const station = Object.values(Stations).find(station => station.metadata?.id === id)
  if (!station) {
    res.status(404).json({ error: 'Station not found' })
    return
  }
  res.json(station)
})

app.get('/stations/:id/playing/now', async (req, res) => {
  const { id } = req.params
  const station = Object.values(Stations).find(station => station.metadata?.id === id)
  if (!station) {
    res.status(404).json({ error: 'Station not found' })
    return
  }
  const nowPlaying = await station.NowPlaying()
  res.json(nowPlaying)
})

app.all('*', (_req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  res.status(404).send(`Endpoint not found.`)
})

app.use((error, req, res, _next) => {
  console.log(`[${req.traceId}] an error occurred:`, error)
  res.setHeader('Content-Type', 'text/plain')
  res.status(500).send(`Oops! Something went wrong.\nTrace: ${req.traceId}`)
})

process.on('unhandledRejection', (...data) => {
  console.error('Unhandled rejection:', ...data)
})
process.on('uncaughtException', (...data) => {
  console.error('Uncaught exception:', ...data)
})

const listener = app.listen(process.env.PORT ?? 3000, () => {
  console.log(`started on http://localhost:${listener.address().port}`)
})