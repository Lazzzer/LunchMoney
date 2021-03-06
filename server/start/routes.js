'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return 'Welcome to the server of Lunch Money'
})

//Token Refresh Route
Route.post('/refresh', 'UserController.refresh')

//User Routes
Route.post('/login', 'UserController.login')
Route.post('/register', 'UserController.register')
Route.post('/logout', 'UserController.logout').middleware(['auth'])
Route.get('/user', 'UserController.show').middleware(['auth'])
Route.put('/user', 'UserController.update').middleware(['auth'])
Route.delete('/user', 'UserController.delete').middleware(['auth'])

// //Budget Routes
Route.get('/budget/current', 'BudgetController.current').middleware(['auth'])
Route.get('/budget/all', 'BudgetController.all').middleware(['auth'])
Route.get('/budget/show/:id', 'BudgetController.show').middleware(['auth'])
Route.get('/budget/expenses/:id', 'BudgetController.expenses').middleware(['auth'])
Route.post('/budget/create', 'BudgetController.create').middleware(['auth'])
Route.put('/budget/edit/:id', 'BudgetController.edit').middleware(['auth'])
Route.put('/budget/archive/:id', 'BudgetController.archive').middleware(['auth'])
Route.delete('/budget/delete/:id', 'BudgetController.delete').middleware(['auth'])

// //Expense Routes
Route.get('/expense/all/:page', 'ExpenseController.all').middleware(['auth'])
Route.get('/expense/show/:id', 'ExpenseController.show').middleware(['auth'])
Route.post('/expense/create', 'ExpenseController.create').middleware(['auth'])
Route.put('/expense/edit/:id', 'ExpenseController.edit').middleware(['auth'])
Route.delete('/expense/delete/:id', 'ExpenseController.delete').middleware(['auth'])

//Statistic Routes
Route.get('/stats/current', 'StatisticController.current').middleware(['auth'])