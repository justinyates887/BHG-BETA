const Captcha = require("@haileybot/captcha-generator");
const Discord = require('discord.js');
const mongo = require('../../mongo')
const guildRolesSchema = require('../setup/schemas/guild-roles-schema')

module.exports = {
    name: 'verify',
    descirption: 'verification for new members',

    async execute(client, msg, args){
        let result;
        try{
            const data = await guildRolesSchema.findOne({
                _id: msg.guild.id
            })
            result = data
        }catch(err){
            return console.error(err)
        }
        if(!result.base){
            msg.reply(`Verification has not been configured, no member role found.`)
        }

        const role = msg.guild.roles.cache.find(r => r.id === result.base)
        if(!role){
            msg.reply(`Couldn't find the base role that had been previously configured.`)
        }

        return await verifyHuman(msg, role)
    }
}

async function verifyHuman(msg, role) {
	let captcha = new Captcha();
	let captchaMessage = msg.channel.send(
		"**Enter the text shown in the image below:**",
		new Discord.MessageAttachment(captcha.JPEGStream, "captcha.jpeg")
	);
	let collector = msg.channel.createMessageCollector(m => m.author.id === msg.author.id);
	await collector.on("collect", async m => {
		if (m.content.toUpperCase() === captcha.value){
            await m.channel.messages.fetch({ limit: 3 })
            .then(messages => { 
                m.channel.bulkDelete(messages)
            })
             m.member.roles.add(role)
        }
		else {
            await msg.channel.messages.fetch({ limit: 3 })
            .then(messages => { 
                msg.channel.bulkDelete(messages)
            })
            msg.reply(`Verification failed. Was looking for: ${captcha.value}`);
        }
		return collector.stop();
	})
}