'use strict'

/* -----------------------------------------------------------------------------
 * dependencies
 * -------------------------------------------------------------------------- */

import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

/* -----------------------------------------------------------------------------
 * rollup config
 * -------------------------------------------------------------------------- */

const sharedPlugins = [
  resolve({
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx', '.json'],
    module: true
  }),
  babel({
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx'],
    exclude: 'node_modules/**'
  })
]

export default [
  {
    input: 'src/index.ts',
    plugins: [...sharedPlugins],
    output: {
      file: 'dist/async.js',
      format: 'umd',
      name: 'Async',
      exports: 'named'
    }
  },
  {
    input: 'src/index.ts',
    plugins: [...sharedPlugins],
    output: {
      file: 'dist/common/async.js',
      format: 'cjs',
      exports: 'named'
    }
  },
  {
    input: 'src/index.ts',
    plugins: [...sharedPlugins],
    output: {
      file: 'dist/es/async.js',
      format: 'es'
    }
  },
  {
    input: 'src/index.ts',
    plugins: [...sharedPlugins, terser()],
    output: {
      file: 'dist/async.min.js',
      format: 'umd',
      name: 'Async',
      exports: 'named'
    }
  }
]
