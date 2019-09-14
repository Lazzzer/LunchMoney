'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TokensSchema extends Schema {
  up() {
    this.create('tokens', (collection) => {
      collection.index('tokenId', { tokenId: 1 })
    })
  }

  down() {
    this.drop('tokens')
  }
}

module.exports = TokensSchema
