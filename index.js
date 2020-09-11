const getProviderSetup = require('./lib/providerSetup')
const awsRegions = require('./lib/awsRegions')
const {createConfig} = require('./lib/createGlobalConfig')

module.exports.getProviderSetup = getProviderSetup
module.exports.awsRegions = awsRegions
module.exports.createGlobalConfig = createConfig