'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', (collection) => {
      collection.index('userId', { userId: 1 })
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
