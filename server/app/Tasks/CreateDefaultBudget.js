'use strict'

const Budget = use('App/Models/Budget')
const User = use('App/Models/User')
const ObjectID = require("mongodb").ObjectID
const Task = use('Task')

class CreateDefaultBudget extends Task {
  static get schedule() {
    return '0 0 0 1 * *'
  }

  async handle() {
    this.info('Creating default budgets...')
    this.createBudgets()
  }

  async createBudgets() {
    const usersQuery = await User
      .where('defaultBudget', true)
      .fetch()
    const userJSON = usersQuery.toJSON()

    for (let userIndex in userJSON) {
      await Budget.with('user')
        .where('current', true)
        .where('user_id', ObjectID(userJSON[userIndex]._id))
        .update({ current: false })

      let defaultBudget = new Budget({
        user_id: ObjectID(userJSON[userIndex]._id),
        limit: userJSON[userIndex].defaultValue,
        current: true
      })
      await defaultBudget.save()
    }
  }

}

module.exports = CreateDefaultBudget
