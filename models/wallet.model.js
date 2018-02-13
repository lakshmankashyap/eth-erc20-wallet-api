const mongoose = require('mongoose')
const { Schema } = mongoose

const walletSchema = Schema({
    name: {
        type: String,
        required: true,
	},
	address: {
		type: String,
        required: true,
	},
	balances: {
		type: Array,
		required: true,
	},
	key: {
		type: Object,
		required: true,
	},
})

walletSchema.pre('save', function (next) {
    const { wallet } = this

    walletModel.find({ wallet }).exec()
        .then(docs => !docs.length ? next() : next(new Error('Wallet exists!')))
        .catch(err => next(new Error(err)))
})

const walletModel = mongoose.model('WalletData', walletSchema)

module.exports = walletModel
