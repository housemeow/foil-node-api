const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.listen(3000, () => {
  console.log('Foil api server listen in port 3000.')
})
