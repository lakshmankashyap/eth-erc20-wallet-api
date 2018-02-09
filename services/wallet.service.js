const config = require('config')
const { addHexPrefix } = require('ethereumjs-util')
const { createKey, dumpKey, recoverKey } = require('../helpers')

const params = config.get('wallet.params')
const options = { ...config.get('wallet.options') }

// todo: remove duplication? create one method
const createWallet = async ({ name, password }) => {
	try {
		const dk = await createKey(params)
		const keyObject = await dumpKey(dk, password, options)
		const wallet = {
			name,
			address: addHexPrefix(keyObject.address),
			balances: null,
			key: keyObject
		}

		return wallet
	} 
	catch (error) {
		throw new Error(error)
	}
}

const importWallet = async ({ name, password, keyObject }) => {
	try {
		const privateKey = await recoverKey(password, keyObject);
		const dk = await createKey(params, privateKey)
		const recoveredKeyObject = await dumpKey(dk, password, options)
		const wallet = {
			name,
			address: addHexPrefix(recoveredKeyObject.address),
			balances: null,
			key: recoveredKeyObject
		}

		return wallet
	}
	catch (error) {
		throw new Error(error)
	}
}

module.exports = {
	createWallet,
	importWallet
}