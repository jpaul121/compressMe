import express from 'express'
import path from 'path'

const app = express()
const port = 8080

app.use(express.static(__dirname + '/dist'))
app.use('/src/assets', express.static(__dirname + '/src/assets'))

app.listen(process.env.PORT || 8080)