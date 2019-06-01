const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello dddzzzzzsdsdz!'))
app.get('/1', (req, res) => res.send('12345'))
app.get('/2', (req, res) => res.send('Hello World! 22222dfdfdf33333'))

app.listen(port, () => console.log(`App listening on port ${port}!`))