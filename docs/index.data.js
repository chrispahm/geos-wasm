import fs from 'node:fs'

export default {
  watch: ['../package.json'],
  load (watchedFiles) {
    return watchedFiles.reduce((version, file) => {
      const packageJson = fs.readFileSync(file, 'utf-8')
      const { GEOS_VERSION } = JSON.parse(packageJson)
      return GEOS_VERSION
    }, '')
  }
}
