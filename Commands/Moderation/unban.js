const { CommandInteraction, MessageEmbed } = require("discord.js")

module.exports = {
    name: "unban",
    description: "Unban a member",
    permission: "BAN_MEMBERS",
    options: [
        {
            name: "userid",
            description: "User ID that you want to unban.",
            type: "STRING",
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { options, guild } = interaction;

        const userId = options.getString("userid");

        guild.members.unban(userId).then((user) => {
            interaction.reply({embeds: [new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Successfully unbanned **${user.tag}** from this server!`)
            ], fetchReply:true}).then(m => {
                setTimeout(() => m.delete(), 5 * 1000)
            }).catch(() => { });
        })
        .catch(() => {
            interaction.reply({embeds: [new MessageEmbed()
                .setColor("RED")
                .setDescription("Please specify a valid banned member's id, or that id is not on ban list.")
            ]})
        })
    }
}