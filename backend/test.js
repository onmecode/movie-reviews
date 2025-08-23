import express from 'express'
const app = express()

app.get('/', (req, res) => {
  res.send('Hello from minimal app')
})

app.listen(3000, () => {
  console.log('Minimal server running on port 3000')
})