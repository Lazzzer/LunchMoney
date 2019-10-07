'use strict'

/** @type {typeof import('lucid-mongo/src/LucidMongo/Model')} */
const Model = use('Model')

class Budget extends Model {
    user() {
        return this.embedsOne('App/Models/User', '_id', 'user_id')
    }

    expenses() {
        return this.hasMany('App/Models/Expense', '_id')
    }
}

module.exports = Budget
