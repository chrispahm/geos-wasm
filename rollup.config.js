import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import { readFileSync } from 'fs'
import nodePolyfills from 'rollup-plugin-polyfill-node'

const pkg = JSON.parse(readFileSync('./package.json'))

export default [
  {
    input: 'src/index.mjs',
    output: [
      {
        name: 'geos',
        file: pkg.module,
        inlineDynamicImports: true,
        format: 'es'
      },
      {
        name: 'geos',
        inlineDynamicImports: true,
        file: 'docs/assets/geos.esm.js',
        format: 'es'
      }
    ],
    plugins: [
      resolve({
        browser: true,
        preferBuiltins: false
      }),
      commonjs({
        transformMixedEsModules: true
      }),
      nodePolyfills({
        include: null
      }),
      terser()
    ]
  }
]
