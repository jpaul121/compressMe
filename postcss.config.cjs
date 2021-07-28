const autoprefixer = require('autoprefixer')
const tailwind = require('tailwindcss')

module.exports = {
  plugins: [ tailwind('./tailwind.config.cjs'), autoprefixer ]
}