const { Client, CommandInteraction, MessageEmbed } = require("discord.js")
const { connection } = require("mongoose")
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
        return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`⛔ Sorry, this command is for developer only.`)]})

        const Response = new MessageEmbed()
        .setColor("AQUA")
        .setDescription(
            `**BOT STATUS:**\n`+
            `**Client**: 🟢 ONLINE!\n`+
            `**Database**: ${switchTo(connection.readyState)}\n`+
            `**Client Ping**: ${client.ws.ping}ms\n`+
            `**Uptime**: <t:${parseInt(client.readyTimestamp / 1000)}:R>`
        )
        
        interaction.reply({embeds: [Response]})
    }
}

function switchTo(val) {
    var status = " ";
    switch(val) {
        case 0 : status = `🔴 DISCONNECTED!`
        break;
        case 1 : status = `🟢 CONNECTED!`
        break;
        case 2 : status = `🟠 CONNECTING!`
        break;
        case 3 : status = `🟣 DISCONNECTING!`
        break;
    }

    return status;
}