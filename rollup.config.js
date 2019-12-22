'use strict'

/* -----------------------------------------------------------------------------
 * dependencies
 * -------------------------------------------------------------------------- */

import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'

/* -----------------------------------------------------------------------------
 * rollup config
 * -------------------------------------------------------------------------- */

const externals = [
  'core-js/modules/es.date.now',
  'core-js/modules/es.object.to-string',
  'core-js/modules/es.object.assign',
  'core-js/modules/es.date.to-string',
  'core-js/modules/es.promise',
  'core-js/modules/es.promise.finally'
]

const sharedPlugins = [
  resolve({
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx', '.json']
  }),
  commonjs(),
  babel({
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx'],
    exclude: 'node_modules/**'
  })
]

export default [
  {
    input: 'src/index.ts',
    external: externals,
    plugins: [...sharedPlugins],
    output: {
      file: 'dist/common/async.js',
      format: 'cjs',
      exports: 'named'
    }
  },
  {
    input: 'src/index.ts',
    external: externals,
    plugins: [...sharedPlugins],
    output: {
      file: 'dist/es/async.js',
      format: 'es'
    }
  },
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
    plugins: [...sharedPlugins, terser()],
    output: {
      file: 'dist/async.min.js',
      format: 'umd',
      name: 'Async',
      exports: 'named'
    }
  }
]
