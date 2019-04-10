import Discord from 'discord.js'
const config = require('../../config.json')

let client = null

const getClient = () => {
  if (client) {
    return client
  }

  const newClient = new Discord.Client()

  newClient.login(config.token)
  
  client = newClient

  return client
}

export default getClient
