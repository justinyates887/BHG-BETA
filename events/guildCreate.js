const Discord = require('discord.js')       //initialize discord library adn API's
const client = new Discord.Client()   

module.exports = async (client, guild) => {

    let found = 0;
    guild.channels.cache.map((channel) => {
        if (found === 0) {
          if (channel.type === "text") {
            if (channel.permissionsFor(client.user).has("VIEW_CHANNEL") === true) {
              if (channel.permissionsFor(client.user).has("SEND_MESSAGES") === true) {
                  let embed = new Discord.MessageEmbed()
                      .setAuthor("Hello!")
                      .setColor("#486dAA") 
                      .setDescription("Thank you for inviting me!\n\n\
                      To see a full list of commands use b!help\n\n\
                      To follow production visit us at https://github.com/justinyates887/BHG-BETA \n\n\
                      To report a bug please message \
                      @Protest#9576, @Mr.Floyd 🇨🇦#0420 or join the Official Discord Channel: https://discord.gg/tb4mZWtXC8")
                        channel.send(embed);
                return found = 1;
              }
            }
          }
        }
      })
}