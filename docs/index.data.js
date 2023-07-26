import fs from 'node:fs'

export default {
  watch: ['../Makefile'],
  load (watchedFiles) {
    return watchedFiles.reduce((version, file) => {
      const makefileContents = fs.readFileSync(file, 'utf-8')
      const geosVersion = makefileContents.match(/GEOS_VERSION = (.*)/)[1]
      version = geosVersion
      return version
    }, '')
  }
}
