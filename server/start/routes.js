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

Route.get('/dashboard', () => {
  return { message: 'Hit the dashboard endpoint' }
}).middleware(['auth'])

//USER ROUTES
Route.post('/login', 'UserController.login').validator('LoginUser')
Route.post('/register', 'UserController.register').validator('RegisterUser')
Route.post('/refresh', 'UserController.refresh')
Route.post('/logout', 'UserController.logout').middleware(['auth'])
Route.get('/user/:name', 'UserController.show').middleware(['auth'])