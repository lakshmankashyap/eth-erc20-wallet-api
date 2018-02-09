const Joi = require('joi')

const estimateTransactionCost = {
	body: {
		to: Joi.string().min(40).max(42).required(),
		value: Joi.string().required(),
		gasPrice: Joi.string().required(),
		data: Joi.string().optional(),
	},
}

const createWallet = {
	body: {
		name: Joi.string().required(),
		password: Joi.string().required(),
		privateKey: Joi.string()
	},
}

const importWallet = {
	body: {
		name: Joi.string().required(),
		type: Joi.string().required(),
		password: Joi.string().required(),
		showInOverview: Joi.boolean().required(),
		keyObject: {
			address: Joi.string().min(40).max(42).required(),
			crypto: {
				cipher: Joi.string().required(),
				ciphertext: Joi.string().required(),
				cipherparams: {
					iv: Joi.string().required(),
				},
				mac: Joi.string().required(),
				kdf: Joi.string().required(),
				kdfparams: {
					dklen: Joi.number().required(),
					salt: Joi.string().required(),
				},
			},
			id: Joi.string().required(),
			version: Joi.number().required(),
		},
	},
}

const removeWallets = {
	body: {
		walletsForRemove: Joi.array().items(Joi.string()),
	},
}

const sendRawTransaction = {
	body: {
		password: Joi.string().required(),
		gasPrice: Joi.string().required(),
		gasLimit: Joi.string().required(),
		to: Joi.string().required(),
		value: Joi.string().required(),
	},
}

const updateWallet = {
	body: {
		name: Joi.string(),
		notes: Joi.string(),
		showInOverview: Joi.boolean(),
	},
}

const walletId = {
	params: {
		id: Joi.string().required(),
	},
}

module.exports = {
	estimateTransactionCost,
	createWallet,
	importWallet,
	removeWallets,
	sendRawTransaction,
	updateWallet,
	walletId,
}
