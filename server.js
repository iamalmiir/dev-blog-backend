const express = require('express')
const helmet = require('helmet')

const app = express()

app.use(helmet())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT} 🚀`)
})
