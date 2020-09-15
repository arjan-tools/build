const path = require('path')
const fs = require('fs')
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

function readConfig(){
  let data = fs.existsSync(path.join(homePath, '.torus/config'))? fs.readFileSync(path.join(homePath, '.torus/config'), 'utf8'): null
  return data
}

function parseConfig(toml){
  let obj = {}
  let arr = toml.split('[')
  //console.log(arr)
  for(let i=1; i<arr.length; i++){
    objval = arr[i].split(']')
    let key = objval[0].trim()
    obj[key]={}
    let keyvals = objval[1].split('\n')
    for(let pair of keyvals){
      if(pair.includes('=')){
        let keyval = pair.split('=')
        obj[key][keyval[0]]=keyval[1]
      }
    }
  }
  return obj
}

function getSettings(){
  return new Promise((resolve, reject) => {
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
      let obj = parseConfig(data)
      for(let p in config.providers) config.providers[p] = obj.default_providers[p]
      for(let o in obj.default_options) config.options[o] = obj.default_options[o]
      resolve(config)
    }).catch(err=> {
      if(err.message.startsWith('ENOENT')) reject('No global torus config file found. Please create a global config file with torus init -g.')
      else reject(err)
    })
  })
}

module.exports = {
  createConfig,
  readConfig,
  parseConfig,
  getSettings
}