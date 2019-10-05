'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Budget extends Model {
    user() {
        return this.embedsOne('App/Models/User', '_id', 'user_id')
    }
}

module.exports = Budget
