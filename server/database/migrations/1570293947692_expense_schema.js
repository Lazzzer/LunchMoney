'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExpenseSchema extends Schema {
  up() {
    this.create('expenses', (collection) => {
      collection.index('expenseId', { expenseId: 1 })
    })
  }

  down() {
    this.drop('expenses')
  }
}

module.exports = ExpenseSchema
