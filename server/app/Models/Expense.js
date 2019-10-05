'use strict'

/** @type {typeof import('lucid-mongo/src/LucidMongo/Model')} */
const Model = use('Model')

class Expense extends Model {
    user() {
        return this.embedsOne('App/Models/User', '_id', 'user_id')
    }
    budget() {
        return this.embedsOne('App/Models/Budget', '_id', 'budget_id')
    }
}

module.exports = Expense
