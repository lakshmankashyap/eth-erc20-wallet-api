const config = require('config')
const { addHexPrefix } = require('ethereumjs-util')
const { getDk, dumpKey } = require('../helpers')
const options = { ...config.get('wallet.options') }

const createOrImportWallet = async ({ name, password, keyObject }) => {
	try {
		const dk = await getDk(password, keyObject)
		const generatedKeyObject = await dumpKey(dk, password, options)

		return {
			name,
			address: addHexPrefix(generatedKeyObject.address),
			balances: null,
			key: generatedKeyObject
		}
	} 
	catch (error) {
		throw new Error(error)
	}
}

module.exports = {
	createOrImportWallet
}