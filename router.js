const router = require('express').Router()
const validate = require('express-validation')
const validations = require('./validations')
const сontroller = require('./controller')

router.route('/')
// create new wallet
	.post(validate(validations.createWallet), сontroller.createWallet)
// get wallets data
	.get(сontroller.getWallets)
// remove multiple wallets
	.delete(validate(validations.removeWallets), сontroller.removeWallets)

// create new wallet from JSON
router.route('/import')
	.post(validate(validations.importWallet), сontroller.importWallet)

// get all transactions for all wallets
router.route('/transactions')
	.get(сontroller.getAllTransactions)

router.route('/:id')
// get single wallet by id
	.get(validate(validations.walletId), сontroller.getWallet)
// remove wallet
	.delete(validate(validations.walletId), сontroller.removeWallet)
// update wallet
	.put(validate(validations.updateWallet), сontroller.updateWallet)

router.route('/:id/transactions')
// get transactions
	.get(validate(validations.walletId), сontroller.getTransactions)
// send raw transaction
	.post(validate(validations.sendRawTransaction), сontroller.sendRawTransaction)

// gas data
router.route('/:id/transactions/gas-price')
	.get(сontroller.getGasPrice)

// estimate transaction cost
router.route('/:id/transactions/cost')
	.post(validate(validations.estimateTransactionCost), сontroller.estimateTransactionCost)

module.exports = router
