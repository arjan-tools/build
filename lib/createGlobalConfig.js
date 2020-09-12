const path = require('path')
const {createDir, createFile} = require('./files');

const homeDir = require('os').homedir();
const homePath = path.join(path.relative(__dirname, '/'), homeDir)

function createConfig(defaults){
  return new Promise((resolve, reject) => {
    createDir(path.join(homePath, '.torus'))
    .then(()=>{
      createFile(path.join(homePath, '.torus/config'), defaults)
      .then((data) => resolve({path:path.join(homePath, '.torus/config'), data:data})).catch(err => reject(err))
    }).catch(err => reject(err))
  })
}

module.exports = {
  createConfig
}