const { Client, MessageEmbed } = require("discord.js")
const mongoose = require("mongoose")
const cron = require("node-cron")
const database = process.env.DATABASE_URL

module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Client} client
     */
    execute(client) {
        console.log(`S.S.S Discord Bot is Online! `)
        client.user.setActivity("S.S.S Community", {type: "WATCHING"})

        mongoose.connect(database, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log("The client is now connected to database!")
        }).catch((err) => {
            console.log(err)
        })

        cron.schedule('0 0 20 1-12 *', () => {
            client.users.cache.get(process.env.DEV_ID).send({embeds: [
                new MessageEmbed()
                .setColor("RED")
                .setTitle("Heroku Notification")
                .setDescription("⛔ Free Dyno will stop running.")
                .addField("Note:", "You have used your entire allocation of 550 free dyno hours. Please change heroku account!")
            ]})
        })
    }
}