const { Client, CommandInteraction, MessageEmbed } = require("discord.js")
const { connection } = require("mongoose")
const connectDB = require("../../Functions/ConnectionFunctions")
require("../../Events/Client/ready")

module.exports = {
    name: "status",
    description: "Displays the status of the client and database connection.",
    permission: "BAN_MEMBERS",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { member } = interaction;

        if (member.id != process.env.DEV_ID)
        return interaction.reply({embeds: [new MessageEmbed()
            .setColor("RED")
            .setDescription(`⛔ Sorry, this command is for developer only.`)
        ]})

        const Response = new MessageEmbed()
        .setColor("AQUA")
        .setDescription(
            `**BOT STATUS:**\n`+
            `**Client**: 🟢 ONLINE!\n`+
            `**Database**: ${connectDB.execute(connection.readyState)}\n`+
            `**Client Ping**: ${client.ws.ping}ms\n`+
            `**Uptime**: <t:${parseInt(client.readyTimestamp / 1000)}:R>`
        )
        
        interaction.reply({embeds: [Response]})
    }
}