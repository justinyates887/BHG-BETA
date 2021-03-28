const mongo = require('../../mongo');
const ticketSchema = require('./schemas/ticket-schema')
const { getRoles } = require('./getRoles');
const idCache = {}

module.exports = {
    name: 'setticketcategory',
    description: 'sets the id for the ticket category where tickets will be stored',

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

        if(!args){
            msg.reply(`Please specify a category ID`)
        }

        if(args.length > 1){
            return msg.reply('Please only specify one category ID')
        }

        const category = msg.member.guild.channels.cache.find(c => c.id === args.join(''))
        console.log(category)

        if(!category){
            msg.reply('Not a valid category id!')
        }

        try{
            const guildID = msg.guild.id;

            await ticketSchema.findOneAndUpdate({
                _id: guildID,
            }, {
                cID: category.id
            }, {
                upsert: true
            })

            return msg.reply(`The ticket category for this server is now ${category.id}`)
        }catch(err){
            return console.error(`Error at setticket.js(50): ${err}`)
        }
    }
}

module.exports.getTicketCat = async (guildID) => {
    const cachedID = idCache[guildID]
    if(cachedID){
        return cachedID;
    }

    try{
        const result = await ticketSchema.findOne({
            _id: guildID
        })

        idCache[guildID] = [result.cID];

        return result
    } catch(err){
        return console.error(`Error at getRoles.js(17): ${err}`)
    }
}