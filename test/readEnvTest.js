const {readConfig} = require('../lib/globalConfig')

readConfig().then(data=>console.log(data)).catch(err=>console.log(err.message))