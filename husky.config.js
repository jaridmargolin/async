'use strict'

/* -----------------------------------------------------------------------------
 * husky config
 * -------------------------------------------------------------------------- */

module.exports = {
  hooks: {
    'pre-commit': 'lint-staged && npm test'
  }
}
