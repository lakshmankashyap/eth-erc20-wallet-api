const config = require('config')
const mongoose = require('mongoose')
const winston = require('winston')
const app = require('./app')

const hostname = config.get('listen.host')
const port = config.get('listen.port')
const dbUrl = config.get('db.url')

mongoose.Promise = Promise
mongoose.connect(dbUrl)

const db = mongoose.connection

db.once('open', () => {
    winston.info('Database connection established')

    app.listen(port, hostname, () => {
        winston.info(`Server running at ${hostname}:${port}`)
    })
})
