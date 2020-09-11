const { networkInterfaces } = require('os');
const nets = networkInterfaces();

const publicIp = require('public-ip');

//get private IP
for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    if (net.family === 'IPv4' && !net.internal) {
      console.log(net.address)
      break
    }
  }
}


 //get public ip
(async () => {
  console.log(await publicIp.v4());
})();