import { JSDOM } from 'jsdom'
import express from 'express'
import fs from 'fs'
import path from 'path'

global.document = new JSDOM(fs.readFileSync('./index.html')).window.document

const app = express()

app.use(express.static(path.resolve(__dirname, '..', 'dist')))
app.use('./assets', express.static(__dirname + './assets'))

app.listen(process.env.PORT || 8080)