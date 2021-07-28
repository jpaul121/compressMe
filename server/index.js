const jsdom = require('jsdom')
const express = require('express')
const fs = require('fs')
const path = require('path')
const favicon = require('serve-favicon')

const DIST_DIR = path.resolve(__dirname, '..', 'dist')
const BUNDLE_HTML = path.join(DIST_DIR, 'index.html')
const FAVICON_PATH = path.join(DIST_DIR, 'favicon.ico')

global.document = new jsdom.JSDOM(fs.readFileSync(BUNDLE_HTML)).window.document

const app = express()

app.use(favicon(FAVICON_PATH))
app.use(express.static(DIST_DIR))

app.listen(process.env.PORT || 8000)