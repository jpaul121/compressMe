async function main() {
  try {
    const { default: express } = await import('express')
    const { default: path } = await import('path')
    const { default: process } = await import('process')

    const DIST_DIR = path.join(process.cwd(), 'dist')
    const HTML_FILE = path.join(DIST_DIR, 'index.html')
    const PORT = process.env.PORT || 8000

    const app = express()

    app.use(express.static(DIST_DIR))
    app.get('/', (_, res) => {
      res.sendFile(HTML_FILE)
    })

    app.listen(PORT)
  } catch(err) {
    console.log(err)
  }
}

main()