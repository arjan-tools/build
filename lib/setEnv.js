const {readGlobalConfig} = require('./globalConfig')
const parseConfig = require('./parseConfig')

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

module.exports = async function setEnv(){
  let gc = await readGlobalConfig().catch(err=> {throw new Error(err)})
  let env = await parseConfig(gc).catch(err=> {throw new Error(err)})
  for(let obj in env){
    if(obj !== 'default_providers' || obj !== 'default_options'){
      for(let elem in env[obj]){
        let key = (obj+env[obj]).toUpperCase()
        process.env[key] = env[obj][elem]
      }
    }
  }
}
