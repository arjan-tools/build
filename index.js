const getProviderSetup = require('./lib/providerSetup')
const awsRegions = require('./lib/awsRegions')
const {createConfig, readGlobalConfig, readProjectConfig, getGlobalConfig} = require('./lib/globalConfig')
const parseConfig = require('./lib/parseConfig')
const {createFile, createDir} = require('./lib/files')
const setEnv = require('./lib/setEnv') 

module.exports.getProviderSetup = getProviderSetup
module.exports.awsRegions = awsRegions
module.exports.readGlobalConfig = readGlobalConfig
module.exports.readProjectConfig = readProjectConfig
module.exports.getGlobalConfig = getGlobalConfig
module.exports.createGlobalConfig = createConfig
module.exports.parseConfig = parseConfig
module.exports.createFile = createFile
module.exports.createDir = createDir
module.exports.setEnv = setEnv
