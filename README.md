![Lunch Money iPhone Mockup](https://raw.githubusercontent.com/Lazzzer/LunchMoney/master/doc/images/LunchMoneyMockup.png)

## About Lunch Money
Lunch Money is an educational project where the main goal is to keep practicing with Vue, learn AdonisJS and make a PWA app using JWT tokens for the authentication part.
***
## Global dependencies
```
Vue CLI
Adonis CLI
MongoDB
```
## Project setup

### Client
```
cd client
npm install
```

#### Compiles and hot-reloads for development
```
cd client
npm run serve
```

#### Compiles and minifies for production
```
cd client
npm run build
```
### Server
```
cd server
npm install
cp .env.example .env
adonis migration:run
```

#### Run Adonis dev server
```
cd server
adonis serve --dev
