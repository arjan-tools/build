function aws(user, group){
  const url= `https://console.aws.amazon.com/iam/home?#/users$new?step=review&accessKey&login&userNames=${username}&passwordReset&passwordType=autogen&groups=${group}`
  return url
}