const path = require('path')
const fs = require('fs')

function parseConfig(filePath){
  let obj = {}
  let file = fs.readFileSync(filePath, 'utf8')
  let arr = file.split('[')
  console.log(arr)
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
  console.log(JSON.stringify(obj))
}

const homeDir = require('os').homedir();
const homePath = path.join(path.relative(__dirname, '/'), homeDir)
parseConfig(path.join(homePath, '.torus/config'))