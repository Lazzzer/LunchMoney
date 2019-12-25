'use strict'

const Budget = use('App/Models/Budget')
const Expense = use('App/Models/Expense')
const ObjectID = require("mongodb").ObjectID

class StatisticController {

    async current({ response, auth }) {
        const query = await Budget.with('user')
            .with('expenses')
            .setVisible(['limit', 'created_at'])
            .where('current', true)
            .where('user_id', auth.user._id)
            .first()

        if (query === null) return response.noContent()

        const queryJSON = query.toJSON();

        const firstDayOfBudget = new Date(queryJSON.created_at)

        if (firstDayOfBudget.getDate() != 1 || !auth.user.defaultBudget) {
            return response.forbidden()
        }

        //Percentage budget spent
        const budgetLimit = queryJSON.limit
        const expensesTotal = queryJSON.expenses.reduce((accumulator, expense) => {
            return accumulator += parseFloat(expense.price)
        }, 0)

        if (expensesTotal === 0) {
            return response.forbidden()
        }

        const budgetSpentPercentage = (parseFloat(expensesTotal) / parseFloat(budgetLimit) * 100).toFixed(0)

        //Spending progression by 10 days & Average spending by 10 days

        const lastDayOfBudget = new Date(new Date(queryJSON.created_at).getFullYear(), new Date(queryJSON.created_at).getMonth() + 1, 0)

        let arrayExpensesBy10Days = [{ totalSpending: 0, progression: 0, date: new Date(queryJSON.created_at) }]
        let progression = 0
        let spending = 0
        for (let i = 10; i <= 21; i += 10) {
            const deadline = new Date(firstDayOfBudget.setDate(firstDayOfBudget.getDate() + 10))

            const expensesBy10Days = queryJSON.expenses.reduce((accumulator, expense) => {
                if (new Date(expense.created_at).getDate() < deadline.getDate()) {
                    return accumulator += parseFloat(expense.price)
                }
                return accumulator
            }, 0)

            progression = expensesBy10Days - progression
            spending = expensesBy10Days

            arrayExpensesBy10Days.push({ totalSpending: expensesBy10Days, progression: progression, date: deadline })
        }
        arrayExpensesBy10Days.push({ totalSpending: expensesTotal, progression: expensesTotal - spending, date: lastDayOfBudget })

        //Percentage of cost by categories and number of expenses by categories
        const groupedExpense = this.groupBy(queryJSON.expenses, expense => expense.type);
        const categories = ['Food', 'Fast Food', 'Restaurant', 'Soft Drink', 'Alcohol', 'Shopping', 'Travel', 'Other']

        let arrayNumberOfExpensesByCategories = []

        categories.forEach(category => {
            if (groupedExpense.get(category) !== undefined) {
                arrayNumberOfExpensesByCategories.push(groupedExpense.get(category).length)
            } else {
                arrayNumberOfExpensesByCategories.push(0)
            }
        })

        let arrayPercentageCostByCategories = []

        categories.forEach(category => {
            if (groupedExpense.get(category) !== undefined) {
                const reducer = groupedExpense.get(category).reduce((accumulator, expense) => {
                    return accumulator += parseFloat(expense.price)
                }, 0)
                arrayPercentageCostByCategories.push(parseFloat((parseFloat(reducer) / parseFloat(expensesTotal) * 100).toFixed(1)))
            } else {
                arrayPercentageCostByCategories.push(0)
            }
        })

        //Average spending for each day
        const averageSpending = queryJSON.expenses.map((expense) => {
            return { day: new Date(expense.created_at).getDay() - 1, price: expense.price }
        })

        let arrayTotalSpendingPerDay = [0, 0, 0, 0, 0, 0, 0]

        averageSpending.forEach(expense => {
            arrayTotalSpendingPerDay[expense.day] += parseFloat(expense.price)
        })


        return response.accepted({
            currency: auth.user.currency,
            expensesTotal: expensesTotal,
            budgetLimit: budgetLimit,
            budgetSpentPercentage: budgetSpentPercentage,
            arrayExpensesBy10Days: arrayExpensesBy10Days,
            arrayNumberOfExpensesByCategories: arrayNumberOfExpensesByCategories,
            arrayPercentageCostByCategories: arrayPercentageCostByCategories,
            arrayTotalSpendingPerDay: arrayTotalSpendingPerDay
        })
    }

    groupBy(list, keyGetter) {
        const map = new Map();
        list.forEach((item) => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return map;
    }
}

module.exports = StatisticController
