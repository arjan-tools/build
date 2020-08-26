const path = require('path')
const {createDir, createFile} = require('./files');

const homeDir = require('os').homedir();
const homePath = path.join(path.relative(__dirname, '/'), homeDir)

const defaults = 
`[default_providers]
domain=other
bucket=aws
dns=aws
cdn=aws
https=aws

[default_options]
index=index.html
error=error.html`


function createConfig(){
  return new Promise((resolve, reject) => {
    createDir(path.join(homePath, '.torus'))
    .then(()=>{
      createFile(path.join(homePath, '.torus/config'), defaults)
      .then((data) => resolve({path:path.join(homePath, '.torus/config'), data:data})).catch(err => reject(err))
    }).catch(err => reject(err))
  })
}

createConfig().then(data=> console.log(data)).catch(err=> console.log(err))