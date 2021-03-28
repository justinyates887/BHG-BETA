const Discord = require("discord.js");
const bhconfig = require('../core/bhconfig.json')
const { checkLogs } = require('../setup/setlogschannel')
const { getRoles } = require('../setup/getRoles')
const redis = require('../../redis');

module.exports = {
    name: 'startgiveaway',
    description: 'starts a giveaway with a reaction',

    async execute(client, msg, args){
        const admin = await getRoles(msg.guild.id)
        const checkRoles = function(admin){
            if(admin && admin.admin){
                let result;
                for(let i = 0; i < admin.admin.length; i++){
                    const role =  msg.member.guild.roles.cache.find(r => r.id === admin.admin[i])
                    if(admin.admin[i] === role.id){
                        result = true
                    } else {
                        result = false
                    }
                }
                return result
            }
        }

        if(!msg.member.hasPermission('ADMINISTRATOR') && checkRoles(admin) === false){
            return msg.channel.send('Missing permissions');
        }

        let filter = m => m.author.id === msg.author.id;
        let target;
        let duration;
        let minutes;
        let days;
        let responseTime;
        let winners;
        let prize;
        let date = new Date();


        msg.channel.send(`🎊Let's set up your giveaway. What channel do you want to start your giveaway in?\n\n\
        \`Please tag a channel. If you want to cancel just stop replying!.\``)

        await msg.channel.awaitMessages(filter, {
            max: 1,
            time: 60000,
            errors: ['time']
        }).then(response => {
            response = response.first()
            if(!response.mentions.channels.first()){
                return response.reply()
            } else{
                return target = response.mentions.channels.first()
            }
        })

        msg.channel.send(`This giveaway will be in <#${target.id}>. How long should the giveaway last?\n\n\
        \`Please enter seconds, or, a durations in minutes followed by M, or days followed by D\``)

        await msg.channel.awaitMessages(filter, {
            max: 1,
            time: 60000,
            errors: ['time']
        }).then(response => {
            response = response.first()
            const arr = response.content.split('')
            const burn = arr.pop()
            if(burn === 'M' || burn === 'm'){
                minutes = Number(arr.join(''))
                return duration = Number(minutes) * 60
            } else if(burn === 'D' || burn === 'd'){
                days = Number(arr.join(''))
                return duration = Number(minutes) * 1440
            } else if(burn.toLowerCase() === 'cancel'){
                return
            } else {
                return duration = Number(response.content)
            }
        })

        if(isNaN(duration)){
            return msg.reply(`Duration was invlaid, please try the giveaway again`)
        }

        if(days){
            msg.channel.send(`Alright, the giveaway in <#${target.id}> will last for **${days}** day(s). How many winners should there be?\n\n\
            \`Please enter a number between 1 and 20\``)
            responseTime =`${days} day(s)`
        } else if(minutes){
            msg.channel.send(`Alright, the giveaway in <#${target.id}> will last for **${minutes}** minutes How many winners should there be?\n\n\
            \`Please enter a number between 1 and 20\``)
            responseTime =`${minutes} minute(s)`
        } else {
            msg.channel.send(`Alright, the giveaway in <#${target.id}> will last for **${duration}** seconds How many winners should there be?\n\n\
            \`Please enter a number between 1 and 20\``)
            responseTime =`${duration} seconds(s)`
        }

        await msg.channel.awaitMessages(filter, {
            max: 1,
            time: 60000,
            errors: ['time']
        }).then(response => {
            response = response.first()
            const number = Number(response.content)
            if(isNaN(number)){
                return response.reply(`That is not a valid number, please try the giveaway again`)
            } else if(response.content.toLowerCase() === 'cancel'){
                return
            } else {
                return winners = number
            }
        })

        msg.channel.send(`Alright, there will be **${winners}** winner(s). Finally, what is the prize?`)

        await msg.channel.awaitMessages(filter, {
            max: 1,
            time: 60000,
            errors: ['time']
        }).then(response => {
            if(response.content === 'cancel'){
                return
            }else{
                response = response.first()
                return prize = response.content
            }
        })

        date.setSeconds(date.getSeconds() + duration)
        const giveawayID = (random(6))
        const gID = msg.guild.id

        let embed = new Discord.MessageEmbed()
        .setAuthor(prize)
        .setColor("#486dAA")
        .setDescription(`React with 🎊 to enter\n\
        Time: ${responseTime}\n\
        Hosted by: <@${msg.author.id}>\n\
        Number of Winners: ${winners}`)
        .setFooter(`Ends: ${date} | gID ${giveawayID}`)

        let mID;
        await target.send(embed)
        .then(a => {
            a.react(`🎊`)
            mID = a.id
        })

        redis.expire(async message => {
            if(message.startsWith('g-')){
                const split = message.split('-')
                const guildID = split[1]
                const messageID = split[2]
                const channelId = split[3]
                const giveaway = split[4]
                const gwinners = split[5]
                const guild = await client.guilds.cache.get(guildID)
                if(!guild){
                    return console.log('guild gone')
                }
                const channel = guild.channels.cache.find(c => c.id === channelId);
                if(!channel){
                    return console.log('channel no longer exists')
                }
                const gmessage = await channel.messages.fetch(messageID)

                const { users } = await gmessage.reactions.cache.first().fetch();
                const reactionsUsers = await users.fetch();
                const possibleWinners = reactionsUsers.array().filter((user) => {
                    return !user.bot;
                });

                let winnersArr = []

                for(let i = 0; i < gwinners; i++){
                    const won = possibleWinners[Math.floor(Math.random() * possibleWinners.length)]
                    winnersArr.push(`✅${won}\n`)
                }

                const result = winnersArr.join('')

                let winEmbed = new Discord.MessageEmbed()
                .setAuthor(`🎊 Winner(s) of giveaway | ${giveaway} | from guild ${guild.name} 🎊`)
                .setColor("#486dAA")
                .setDescription(result)
                .setTimestamp()

                const logs = await checkLogs(channel.guild.id)
                if(logs.desired === true){
                    const logtarget = channel.guild.channels.cache.find(channel => channel.id === logs.cID)
                    if (bhconfig.embeds === true) {
                        let logembed = new Discord.MessageEmbed()
                            .setAuthor("✅ Giveaway Ended!")
                            .setColor("#008000")
                            .setDescription(`Giveaway ${giveaway} just ended. Here are the winners:\n${winners}`)
                         logtarget.send(logembed);
                    }
                    else {
                        logtarget.send(`Giveaway ${giveaway} just ended. Here are the winners:\n${winners}`);
                    }
                }
                return gmessage.channel.send(winEmbed)
            } else {
                return
            }
        })

        const redisClient = await redis()
        try{
            const redisKey = `g-${gID}-${mID}-${target.id}-${giveawayID}-${winners}`;
            redisClient.set(redisKey, 'true', 'EX', duration)
            return msg.channel.send(`Your giveaway was sucessfully added!`)
        }catch(err){
            console.error(err)
            return msg.reply('There was an error in saving your giveaway, please report this!')
        }
    }
}

const random = (size) => {
    let generatedOutput= '';
    const storedCharacters =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const totalCharacterSize = storedCharacters.length;
    for ( let index = 0; index < size; index++ ) {
       generatedOutput+=storedCharacters.charAt(Math.floor(Math.random() *
       totalCharacterSize));
    }
    return generatedOutput;
 }
