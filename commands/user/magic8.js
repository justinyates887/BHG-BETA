const bhconfig = require("../core/bhconfig.json");
const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
    name: 'magic8',
    description: 'runs a magic 8-ball',

    execute(client, msg){

        integerStore = Math.floor(Math.random() * Math.floor(9));
        let ans;

        switch (integerStore){

            case 0:
              ans = "Yes";
              break;
      
            case 2:
              ans = "No";
              break;
      
            case 2:
              ans = "Possibly";
              break;
      
            case 3:
              ans = "It is uncertain";
              break;
      
            case 4:
              ans = "Most definitly!";
              break;
      
            case 5:
              ans = "Your future is clouded";
              break;
      
            case 6:
              ans = "I wouldn't count on it";
              break;
      
            case 7:
              ans = "Ask again later";
              break;
      
            case 8:
              ans = "It is certain";
              break;
      
            case 9:
              ans = "Why would you leave your fate up to a computer?";
              break;
      
            default:
              ans = "System Error: I can not actually predict the future.";
          }

          if (bhconfig.embeds === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor("The Magic8 says...")
                .setColor("#486dAA")
                .setDescription(ans)
                .setFooter(bhconfig.footer)
            return msg.channel.send(embed);
        }

    }
}