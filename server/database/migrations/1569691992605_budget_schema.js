'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BudgetSchema extends Schema {
  up() {
    this.create('budgets', (collection) => {
      collection.index('budgetId', { budgetId: 1 })
    })
  }

  down() {
    this.drop('budgets')
  }
}

module.exports = BudgetSchema
