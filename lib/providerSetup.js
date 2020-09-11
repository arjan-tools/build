// returns the url for each provider (to be oppened in the browser) 
// and the log message for setting up
const publicIp = require('public-ip');

function aws(options){
  return new Promise((resolve, reject) => {
    if(!options){
      options = {}
      if(!options.awsRegion) options['awsRegion'] = 'us-east-1'
      if(!options.iamUserName) options['iamUserName'] = 'torus_default'
    }
    const setup = `
    1. click on confirm
    2. Add the API keys into ~/.torus/config in the following format:
    [aws]
    api_key=YOUR_API_KEY
    secret_key=YOUR_SECRET_KEY
    `
    if(/^[+=,.@_\-a-zA-Z0-9]*$/.test(options.iamUserName)){
      const url = `https://console.aws.amazon.com/iam/home?region=${awsRegion}#/users$new?step=review&accessKey&userNames=${iamUserName}&permissionType=policies&policies=arn:aws:iam::aws:policy%2FAdministratorAccess`;
      if(awsRegion){
        if(regionSet.includes(awsRegion)) resolve({setup:setup, url:url});
        else reject('Invalid AWS region code')
      }
    }
    else reject('Invalid IAM user name. Only alphanumeric strings with the following special characters: plus (+), equal (=), comma (,), period (.), at (@), underscore (_), and hyphen (-).')
  })
}

function godaddy(){
  return new Promise((resolve) => {
    const url = `https://developer.godaddy.com/keys`
    const setup =
    `
    1. Sign in to godaddy and get your customer number by clicking on your username in the upper right-hand corner.
    2. Click on the 'Create a new API Key' button.
    3. On the pop-up, give your API key a name (like torus-tools), under environment click on 'Production' then click 'Next'.
    4. Add the API keys into ~/.torus/config in the following format:
    [godaddy]
    godaddy_api_key=YOUR_API_KEY
    godaddy_secret_key=YOUR_SECRET_KEY
    godaddy_customer=YOUR_CUSTOMER_NUMBER
    \n
    `
    resolve({setup:setup, url:url})
  })
}

function namecheap(){
  return new Promise((resolve, reject) => {
    const url = `https://ap.www.namecheap.com/settings/tools/apiaccess/`
    publicIp.v4().then((ip) => {
      const setup = `
      1. Click on the switch in the right hand side to enable API access.
      2. Enter your password to confirm
      3. Whitelist your public IP address - ${ip}
      4. Copy your API key into ~/.torus/config in the following format:
        [namecheap]
        username=YOUR_NAMECHEAP_USERNAME
        api_user=YOUR_API_USER
        api_key=YOUR_API_KEY
        client_ip=${ip}
      `
      resolve({setup:setup, url:url})
    }).catch(err => reject(err))
  })
}

module.exports = {
  aws,
  godaddy,
  namecheap
}