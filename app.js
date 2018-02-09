const bodyParser = require('body-parser')
const errorhandler = require('errorhandler')
const express = require('express')
const morgan = require('morgan')
const winston = require('winston')
const router = require('./router')
// const cors = require('cors')

const app = express()

// todo: cors whitelist

// const whitelist = new Set()
// whitelist.add('http://tcr.dappdev.org')

if (process.env.NODE_ENV === 'development') {
	winston.level = 'debug'
	app.use(errorhandler())
	app.use(morgan('dev'))
	// whitelist.add('http://localhost:3000')
	// whitelist.add('http://127.0.0.1:3000')
}

// const corsOptions = {
//     origin: (origin, callback) => callback(null, whitelist.has(origin))
// }

// app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api/wallets', router)

module.exports = app
