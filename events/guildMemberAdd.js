const Discord = require('discord.js') 
const redis = require('../redis');
const bhconfig = require('../commands/core/bhconfig.json')
const { getRoles } = require('../commands/setup/getRoles')
const { updateChannels } = require('../commands/setup/serverstats')
const { checkLogs } = require('../commands/setup/setlogschannel')
const Canvas = require('canvas')
const { MessageAttachment } = require ('discord.js')
const path = require('path')
const { getChannelID } = require('../commands/setup/welcome')

module.exports = async (client, member) => {
    const logs = await checkLogs(member.guild.id)
    if(logs && logs.desired === true){
        const target = member.guild.channels.cache.find(channel => channel.id === logs.cID)
        if (bhconfig.embeds === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor("✅ Member Joined")
                .setColor("#008000")
                .setDescription(`Member <@${member.id}> just joined!`)
                .setFooter(bhconfig.footer)
             target.send(embed);
        }
        else {
            target.send(`Member <#${member.id}> just joined!`);
        }
    }

    onJoin(member);
    checkMute(member);
    updateChannels(member.guild.id, member.guild);
    return 
}

const onJoin = async member => {
    const { guild } = member
    const channelID = getChannelID(guild.id)

    const channel = guild.channels.cache.get(channelID)
    if(!channel){
        return
    }

    const canvas = Canvas.createCanvas(700, 250)
    const ctx = canvas.getContext('2d')
    const background = await Canvas.loadImage(
        path.join(__dirname, '../background.png')
    )
    let x = 0
    let y = 0
    ctx.drawImage(background, x, y)
    const pfp = await Canvas.loadImage(
        member.user.displayAvatarURL({
            format: 'png'
        })
    )
    x = canvas.width / 2 - pfp.width / 2
    y = 25
    ctx.drawImage(pfp, x, y)

    ctx.fillStyle = '#ffffff'
    ctx.font = '35px sans-serif'
    let text = `Welcome ${member.user.tag}`
    x = canvas.width / 2 - ctx.measureText(text).width / 2
    ctx.fillText(text, x, 60 + pfp.height)

    ctx.font = '30px sans-serif'
    text = `Member #${guild.memberCount}`
    x =  canvas.width / 2 - ctx.measureText(text).width / 2
    ctx.fillText(text, x, 100 + pfp.height)

    const attachment = new MessageAttachment(canvas.toBuffer())
    channel.send('', attachment)
}
 
const checkMute = async member => {
    const { id, guild  } = member;
    const redisCLient = await redis();

    try{
        redisCLient.get(`muted-${id}`, (err, result) => {
            if(err){
                return console.error(`Error conntecting to redis at guildMemberAdd.js(45): ${err}`)
            } else if (result){
                const guildRoles = getRoles(guild.id);
                const mutedRole = guild.roles.cache.find(role => role.id === guildRoles.mute)

                if(mutedRole){
                    return member.roles.add(mutedRole)
                }
            }
        })
    } catch(err){
        return console.error(`Error at guildMemberAdd(44): ${err}`)
    }
}