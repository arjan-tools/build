const path = require('path')
const {createDir, createFile} = require('./files');
const fs = require('fs')

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

function readConfig(){
  return new Promise((resolve, reject) => {
    fs.promises.readFile(path.join(homePath, '.torus/config'), 'utf8').then(data=>resolve(data))
    .catch(err=>reject(err))
  })
}

module.exports = {
  readConfig,
  createConfig
}