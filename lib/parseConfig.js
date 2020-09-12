
const fs = require('fs')

module.exports = async function parseConfig(toml){
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
