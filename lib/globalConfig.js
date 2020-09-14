const path = require('path')
const {createDir, createFile} = require('./files');
const fs = require('fs')
const parseConfig = require('./parseConfig');
const { resolve } = require('path');


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

function readGlobalConfig(){
  return new Promise((resolve, reject) => {
    fs.promises.readFile(path.join(homePath, '.torus/config'), 'utf8').then(data=>resolve(data))
    .catch(err=>reject(err))
  })
}

function readProjectConfig(){
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
      getGlobalConfig().then(data=> resolve(data))
      .catchh(err=> reject(err))
    }
  })
}

function getGlobalConfig(){
  let config = {
    options:{
      index:'index.html',
      error:'error.html'
    },
    providers: {
      registrar: 'other',
      bucket: 'aws',
      cdn: 'aws',
      dns: 'aws',
      ssl: 'aws'
    }
  }
  fs.promises.readFile(path.join(homePath, '.torus/config'), 'utf8').then(data=>{
    parseConfig(data).then(obj=> {
      for(let p in config.providers) config.providers[p] = obj.default_providers[p]
      for(let o in obj.default_options) config.options[o] = obj.default_options[o]
      resolve(config)
    })
  }).catch(err=> {
    if(err.message.startsWith('ENOENT')) reject('No global torus config file found. Please create a global config file with torus init -g.')
    else reject(err)
  })
}

module.exports = {
  readGlobalConfig,
  createConfig,
  getGlobalConfig,
  readProjectConfig
}