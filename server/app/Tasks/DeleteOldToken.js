'use strict'

const Task = use('Task')
const Token = use('App/Models/Token')

class DeleteOldToken extends Task {
  static get schedule() {
    return '0 0 0 */10 * *'
  }

  async handle() {
    this.info('Deleting old tokens...')
    this.deleteOldTokens()
  }

  async deleteOldTokens() {
    let date = new Date(Date.now())
    date.setDate(date.getDate() - 10);
    await Token.where('created_at').lt(date).delete()
  }
}

module.exports = DeleteOldToken
