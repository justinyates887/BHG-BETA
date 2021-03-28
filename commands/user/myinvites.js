module.exports = {
    name: 'myinvites',
    description: 'lets a user see their invites',

    async execute(client, msg){
        await msg.guild.fetchInvites()
        .then(invites =>
            {
                const userInvites = invites.array().filter(invite => invite.inviter === msg.author);
                let userInviteCount = 0;
                for(let i = 0; i < userInvites.length; i++)
                {
                    let invite = userInvites[i];
                    userInviteCount += invite['uses'];
                }
                msg.reply(`You have ${userInviteCount} invites.`);
            }
        )
    }
}