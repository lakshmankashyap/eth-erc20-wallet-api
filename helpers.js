const keythereum = require('keythereum')
const secp256k1 = require('secp256k1/elliptic')

const createKey = (params, privateKey) =>
	new Promise(resolve => keythereum.create(params, dk => {
		// if private key is provided - validate
		if (privateKey) {
			// if valid - assign it to dk
			// todo: isValidPrivate from ethereumjs-util
			if (secp256k1.privateKeyVerify(Buffer.from(privateKey, 'hex'))) {
				dk.privateKey = privateKey
			}
			else {
				throw new Error('Private key is not valid')
			}
		}
		// otherwise resolve dk with generated private key
		resolve(dk)
	}))

const dumpKey = (dk, password, options) =>
	new Promise(resolve => keythereum.dump(password, dk.privateKey, dk.salt, dk.iv, options, resolve))

const recoverKey = (password, keyObject) =>
	new Promise(resolve => keythereum.recover(password, keyObject, privateKey => resolve(privateKey)))

module.exports = {
	createKey,
	dumpKey,
	recoverKey,
}