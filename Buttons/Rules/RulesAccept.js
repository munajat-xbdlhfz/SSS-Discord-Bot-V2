const { MessageEmbed } = require("discord.js")

module.exports = {
    id: "rules-accept",
    async execute(interaction) {
        const { member } = interaction;

        if (member.roles.cache.some(role => role.id === process.env.ROLE_SSS_SLAYER_ID))
        return interaction.reply({embeds: [new MessageEmbed()
            .setColor("RED")
            .setDescription(`⛔ You already have accepted the rules or have role <@&${process.env.ROLE_SSS_SLAYER_ID}>.`)
        ], ephemeral: true})

        member.roles.add(process.env.ROLE_SSS_SLAYER_ID)
        return interaction.reply({embeds: [new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`✅ You have accepted the rules, now you have role <@&${process.env.ROLE_SSS_SLAYER_ID}>.`)
        ], ephemeral: true})
    }
}