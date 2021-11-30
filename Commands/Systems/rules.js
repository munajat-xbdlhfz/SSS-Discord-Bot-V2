const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports = {
    name: "rules",
    description: "Send rules message to rules channel.",
    permission: "ADMINISTRATOR",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { guild } = interaction;

        const rules = new MessageEmbed()
        .setColor("AQUA")
        .setTitle(`WELCOME TO ${guild.name.toUpperCase()}`)
        .setDescription(
            `Sudahkah membaca rules discord ${guild.name}? Mohon dibaca rulesnya yaa Sobat Hunter.`
        )
        .addField(
            `${guild.name} Rules`,
            `- No Rusuh.\n`+
            `- No Spam Tidak Jelas.\n`+
            `- No Cheat (Auto Ban/Kick).\n`+
            `- No Sara (Suku, Agama, Ras & Antar Golongan).\n`+
            `- No Trash Talk dan Toxic Parah/Ngegas (sewajarnya saja, nyadar diri).\n`+
            `- Pahami Privasi Sesama.\n`+
            `- Ulur Tangan dan Saling bantu.\n`+
            `- Share memes khusus di <#${process.env.SHIT_POST_ID}>.\n`+
            `- Gunakan Channel Sesuai pada Tempatnya.\n`+
            `- Boleh Share Link (promote youtube, video gak jelas, dll) di <#${process.env.SHARE_LINK_ID}>.\n`+
            `- Ambil role sendiri untuk membuka info & discussion sesuai game yang kalian suka di <#${process.env.ROLES_ID}>.\n\n`+
            `\`\`\`Aturan bisa berubah dan juga bertambah seiring waktu.\`\`\` \n`+
            `Klik **Accept** apabila sudah membaca rules diatas untuk mendapatkan akses ke semua channel.`
        )
        const image = new MessageEmbed().setColor("AQUA").setImage("https://cdn.discordapp.com/attachments/915166198558253056/915167493843189760/unknown.png")

        const button = new MessageActionRow();
        button.addComponents(
            new MessageButton().setCustomId("rules-accept").setLabel("✅ Accept").setStyle("PRIMARY")
        )

        await interaction.reply({embeds: [new MessageEmbed().setColor("GREEN").setDescription(`✅ Successfully send a rules message to <#${process.env.RULES_ID}>`)]})
        
        client.channels.cache.get(process.env.RULES_ID).send({embeds: [image, rules], components: [button]})
    }
}