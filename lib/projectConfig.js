const {getSettings} = require('./globalConfig')

module.exports = function getProjectConfig(){
  return new Promise((resolve, reject) => {
    if(fs.existsSync('./torus/config.json')) {
      fs.promises.readFile('./torus/config.json').then(data=>{
        try {
          resolve(JSON.parse(data))
        } catch (err) {
          reject(err)
        }
      })
    }
    else {
      getSettings().then(data=> resolve(data))
      .catchh(err=> reject(err))
    }
  })
}