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

function createTeam(){
  //if there is a config.json file && the config.json contains a team
    //read the global config file
    //if there isnt a team set the team to the local config file
    //if there isnt a role set the role to user 
  //else 
    //read the global config file
      //if there isnt a team 
        //create an IAM team
        //add it to the global config
        //add role admin in global config
      //else 
        //add the team in the local config
        //if there isnt a role
}

createConfig().then(data=> console.log(data)).catch(err=> console.log(err))