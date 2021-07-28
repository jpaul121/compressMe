import './index.css'

import App from './App'
import { JSDOM } from 'jsdom'
import React from 'react'
import ReactDOM from 'react-dom'
import fs from 'fs'
import path from 'path-browserify'

const HTML_SRC = path.join(__dirname, 'index.html')

global.document = new JSDOM(fs.readFileSync(HTML_SRC)).window.document

ReactDOM.render(<App />, document.getElementById('root'))
