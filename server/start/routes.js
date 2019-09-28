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
  return { greeting: 'Hello world in JSON' }
})

//Token Refresh Route
Route.post('/refresh', 'UserController.refresh')

//User Routes
Route.post('/login', 'UserController.login').validator('LoginUser')
Route.post('/register', 'UserController.register').validator('RegisterUser')
Route.post('/logout', 'UserController.logout').middleware(['auth'])
Route.get('/user', 'UserController.show').middleware(['auth'])
// Route.put('/user').middleware(['auth'])
// Route.delete('/user').middleware(['auth'])

// //Budget Routes
Route.get('/budget/current', 'BudgetController.current').middleware(['auth'])
// Route.get('/budget/all').middleware(['auth'])
// Route.get('/budget/show/:id).middleware(['auth])
Route.post('/budget/create', 'BudgetController.create').middleware(['auth'])
// Route.put('/budget/edit/:id').middleware(['auth'])
// Route.delete('/budget/delete/:id').middleware(['auth'])

// //Expense Routes
// Route.get('/expense/all').middleware(['auth'])
// Route.get('/expense/show/:id).middleware(['auth])
// Route.post('/expense/create').middleware(['auth'])
// Route.put('/expense/edit/:id').middleware(['auth'])
// Route.delete('/expense/delete/:id').middleware(['auth'])