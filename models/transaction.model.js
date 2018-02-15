const mongoose = require('mongoose')
const { Schema } = mongoose

const transactionSchema = Schema({

})

transactionSchema.pre('save', function (next) {
    const { transaction } = this

    transactionModel.find({ transaction }).exec()
        .then(docs => !docs.length ? next() : next(new Error('Transaction exists!')))
        .catch(err => next(new Error(err)))
})

const transactionModel = mongoose.model('TransactionData', transactionSchema)

module.exports = transactionModel
