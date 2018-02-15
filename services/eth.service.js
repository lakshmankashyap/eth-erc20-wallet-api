const { addHexPrefix } = require('ethereumjs-util')
const axios = require('axios')
const BigNumber = require('bignumber.js')
const config = require('config')
const winston = require('winston')
const etherscanUrl = config.get('etherscan.url')
const apikey = config.get('etherscan.apikey')

const estimateTransactionCost = ({ to, value, gasPrice, data }, walletAddress) => {
	winston.debug('ethService.estimateTransactionCost', args)

	const params = {
		module: 'proxy',
		action: 'eth_estimateGas',
		from: walletAddress,
		to,
		value: addHexPrefix(new BigNumber(value).mul(10 ** 18).toString(16)),
		gasPrice: addHexPrefix(new BigNumber(gasPrice).mul(10 ** 9)),
		gas: '0xffffff',
		apikey,
		data,
	}

	return axios.get(etherscanUrl, { params })
		.then(response => {
			if (Object.prototype.hasOwnProperty.call(response.data, 'error')) {
				throw new Error(response.data.error.message)
			}

			return new BigNumber(response.data.result).toString(10)
		})
}

const getBalance = address => {
	winston.debug('ethService.getBalance', address)

	const params = {
		module: 'account',
		action: 'balance',
		address,
		tag: 'latest',
		apikey,
	}

	return axios.get(etherscanUrl, { params })
		// todo: find better way
		.then(response => new BigNumber(response.data.result).div(10 ** 18).toString(10))
}

const getGasPrice = () => {
	winston.debug('ethService.getGasPrice')

	const params = {
		module: 'proxy',
		action: 'eth_gasPrice',
		apikey,
	}

	return axios.get(etherscanUrl, { params })
		// todo: find better way
		.then(response => new BigNumber(response.data.result).div(10 ** 9).toString(10))
}

const getTransactions = address => {
	winston.debug('ethService.getTransactions', address)

	const params = {
		module: 'account',
		action: 'txlist',
		startblock: '0',
		endblock: '99999999',
		sort: 'asc',
		address,
		apikey,
	}

	return axios.get(etherscanUrl, { params })
		.then(response => response.data.result)
		.then(txs => txs.map(tx => ({
			account: address,
			currency: 'eth',
			blockNumber: tx.blockNumber,
			timeStamp: tx.timeStamp,
			hash: tx.hash,
			nonce: tx.nonce,
			blockHash: tx.blockHash,
			transactionIndex: tx.transactionIndex,
			from: tx.from,
			to: tx.to,
			value: tx.value,
			gas: tx.gas,
			gasPrice: tx.gasPrice,
			isError: tx.isError,
			input: tx.input,
			contractAddress: tx.contractAddress,
			cumulativeGasUsed: tx.cumulativeGasUsed,
			gasUsed: tx.gasUsed,
			confirmations: tx.confirmations,
			_id: tx._id,
		})))
}

const getTransactionsCount = address => {
	winston.debug('ethService.getTransactionsCount', address)

	const params = {
		module: 'proxy',
		action: 'eth_getTransactionCount',
		address,
		tag: 'latest',
		apikey,
	}

	return axios.get(etherscanUrl, { params })
		.then(response => response.data.result)
}

const sendRawTransaction = (password, gasPrice, gasLimit, to, value, { address, key }) => {
	winston.debug('ethService.getTransactionsCount', args)

	// private key recovery from password
	return new Promise((resolve, reject) => {
		try {
			keythereum.recover(password, key, privateKey => resolve(privateKey))
		} catch (err) {
			reject(err)
		}
	})
		// get nonce after recovering private key
		.then(privateKey => this.getTransactionsCount(address)
			.then((nonce) => {
				const params = {
					nonce: `${nonce.toString(16)}`,
					gasPrice: addHexPrefix(new BigNumber(gasPrice).mul(10 ** 9).toString(16)),
					gasLimit: addHexPrefix(new BigNumber(gasLimit).toString(16)),
					to,
					value: addHexPrefix(new BigNumber(value).mul(10 ** 18).toString(16)),
					chainId: config.get('chainId'),
				}

				const tx = new EthereumTx(params)

				tx.sign(privateKey)

				const serializedTx = tx.serialize()

				const params = {
					module: 'proxy',
					action: 'eth_sendRawTransaction',
					hex: serializedTx.toString('hex'),
					apikey,
				}

				return axios.get(etherscanUrl, { params })
			}))
}

module.exports = {
	estimateTransactionCost,
	getBalance,
	getGasPrice,
	getTransactions,
	getTransactionsCount,
	sendRawTransaction,
}