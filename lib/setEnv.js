const fs = require('fs')
const {readConfig, parseConfig} = require('./globalConfig')

//  sets the enviornment variables from the global config and returns a json config with the defaults
// recieves an object in the format 
/* 
  {
    provider: {
      api_key: YOUR_API_KEY,
      secret_key: YOUR_API_SECRET_KEY,
      ...
    } 
  }
*/

async function globalEnv(){
  let gc = readConfig()
  if(gc){
    let env = parseConfig(gc)
    for(let obj in env){
      if(obj !== 'default_providers' && obj !== 'default_options'){
        for(let elem in env[obj]){
          let key = (obj+'_'+elem).toUpperCase()
          //console.log(key, env[obj][elem])
          process.env[key] = env[obj][elem]
        }
      } 
    }
    return 'done'
  }
  else return '~/.torus/config file not found'
}

function dotEnv(){
  if(fs.existsSync('./.env')){
    let env = fs.readFileSync('./.env', 'utf8')
    envArr = env.split('\n')
    for(let line of envArr){
      if(line.trim().length > 0){
      let keyval = line.split('=')
      if(keyval.length > 2) throw new Error('malformatted .env file')
      else process.env[keyval[0]]=keyval[1]
      }
    }
    return 'done'
  }
  else return '.env file not found'
}

module.exports = {
  globalEnv,
  dotEnv
}