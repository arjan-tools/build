const fs = require('fs');

function createFile(filePath, contents){
  return new Promise((resolve, reject) => {
    if(fs.existsSync(filePath)) fs.promises.readFile(filePath, 'utf8').then(data => resolve(data)).catch(err => reject(err))
    else {
      fs.promises.writeFile(filePath, contents)
      .then(() => resolve(contents))
      .catch(err => reject(err))
    }
  })
}

function createDir(dir){
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dir)) resolve(false)
    else {
      fs.promises.mkdir(dir)
      .then(resolve(true))
      .catch(err => reject(err))
    }
  })
}

module.exports = {
  createFile,
  createDir
}