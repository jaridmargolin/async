'use strict'

/* -----------------------------------------------------------------------------
 * typedoc config
 * -------------------------------------------------------------------------- */

module.exports = {
  exclude: ['./src/*.test.ts'],
  mode: 'modules',
  out: './docs',
  readme: 'none',
  excludePrivate: true,
  excludeNotExported: true,
  outline: false
}
