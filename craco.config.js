// Config
const path = require('path')
const tsConfigBase = require('./tsconfig.base.json')

// Get compilerOptions properties
const { paths, baseUrl } = tsConfigBase.compilerOptions

function generateAliases() {
  const keys = Object.keys(paths)

  return keys.reduce((acc, key) => {
    const field = key.replace('/*', '')
    const currentPath = paths[key][0].replace('/*', '')
    const value = `./${baseUrl}/${currentPath}`

    return {
      ...acc,
      [field]: path.resolve(__dirname, value)
    }
  }, {})
}

const alias = generateAliases()

module.exports = {
  webpack: {
    alias: alias
  }
}
