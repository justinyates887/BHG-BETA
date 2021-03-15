module.exports = async (client) => {

    let found = 0;
    guild.channels.cache.map((channel) => {
        if (found === 0) {
          if (channel.type === "text") {
            if (channel.permissionsFor(client.user).has("VIEW_CHANNEL") === true) {
              if (channel.permissionsFor(client.user).has("SEND_MESSAGES") === true) {
                if (config.embeds === true) { 
                    let embed = new Discord.MessageEmbed()
                        .setAuthor("Hello!")
                        .setColor("#486dAA") 
                        .setDescription("Thank you for inviting me!\n\n\
                         We are still in production and have no database yet, so customization is limited. \
                        There are a few things you need to have for some functions to work properly.\n\n\
                        To see a full list of commands use !help\n\n\
                        To follow production visit us at https://github.com/justinyates887/blue-haired-girl-bot \n\n\
                        To report a bug please friend \
                        @Protest#9576, @Mr.Floyd 🇨🇦#0420 or join the Official Discord Channel: https://discord.gg/tb4mZWtXC8") //main text body
                        .setFooter(config.footer)
                         channel.send(embed);
                }
                found = 1;
              }
            }
          }
        }
      })
}