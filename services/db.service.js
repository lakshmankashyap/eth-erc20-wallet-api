const winston = require('winston')
const Wallet = require('../models/wallet.model')

const getAllTransactions = () => {}
const getTransactions = () => {}
const getWallet = () => {}
const getWallets = () => {}
const insertWallet = wallet => new Wallet(wallet).save()
const saveTransactions = () => {}
const updateWallet = () => {}
const updateWalletBalances = () => {}
const removeWallet = () => {}
const removeWallets = () => {}

module.exports = {
	getAllTransactions,
	getTransactions,
	getWallet,
	getWallets,
	insertWallet,
	saveTransactions,
	updateWallet,
	updateWalletBalances,
	removeWallet,
	removeWallets
}