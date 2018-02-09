const winston = require('winston')
const walletService = require('./services/wallet.service')
const dbService = require('./services/db.service')

const estimateTransactionCost = (req, res, next) => {
	winston.debug('controller.estimateTransactionCost called')

	return walletService.estimateTransactionCost(req.body)
		.then(txCost => res.status(200).json(txCost))
		.catch(error => next(error))
}

const createWallet = (req, res, next) => {
	winston.debug('controller.createWallet called')

	return walletService.createOrImportWallet(req.body)
		.then(wallet => dbService.insertWallet(wallet))
		.then(wallet => res.status(201).json(wallet))
		.catch(error => next(error))
}

const importWallet = (req, res, next) => {
	winston.debug('controller.importWallet called')

	return walletService.createOrImportWallet(req.body)
		.then(wallet => dbService.insertWallet(wallet))
		.then(wallet => res.status(201).json(wallet))
		.catch(error => next(error))
}

const getAllTransactions = (req, res, next) => {
	winston.debug('controller.getAllTransactions called')

	return dbService.getAllTransactions(req.body)
		.then(transactions => res.status(200).json(transactions))
		.catch(error => next(error))
}

const getGasPrice = (req, res, next) => {
	winston.debug('controller.getGasPrice called')

	return walletService.getGasPrice(req.body)
		.then(gasPrice => res.status(200).json(gasPrice))
		.catch(error => next(error))
}

const getTransactions = (req, res, next) => {
	winston.debug('controller.getTransactions called')

	return dbService.getTransactions(req.body)
		.then(transactions => res.status(200).json(transactions))
		.catch(error => next(error))
}

const getWallet = (req, res, next) => {
	winston.debug('controller.getWallet called')

	return dbService.getWallet(req.body)
		.then(wallet => res.status(200).json(wallet))
		.catch(error => next(error))
}

const getWallets = (req, res, next) => {
	winston.debug('controller.getWallets called')

	return dbService.getWallets(req.body)
		.then(wallets => res.status(200).json(wallets))
		.catch(error => next(error))
}

const removeWallet = (req, res, next) => {
	winston.debug('controller.removeWallet called')

	return dbService.removeWallet(req.body)
		.then(() => res.status(204))
		.catch(error => next(error))
}

const removeWallets = (req, res, next) => {
	winston.debug('controller.removeWallets called')

	return dbService.removeWallets(req.body)
		.then(() => res.status(204))
		.catch(error => next(error))
}

const sendRawTransaction = (req, res, next) => {
	winston.debug('controller.sendRawTransaction called')

	return walletService.sendRawTransaction(req.body)
		.then(txHash => res.status(200).json(txHash))
		.catch(error => next(error))
}

const updateWallet = (req, res, next) => {
	winston.debug('controller.updateWallet called')

	return dbService.updateWallet(req.body)
		.then(wallet => res.status(204).json(wallet))
		.catch(error => next(error))
}

module.exports = {
	estimateTransactionCost,
	createWallet,
	importWallet,
	getAllTransactions,
	getGasPrice,
	getTransactions,
	getWallet,
	getWallets,
	removeWallet,
	removeWallets,
	sendRawTransaction,
	updateWallet,
}