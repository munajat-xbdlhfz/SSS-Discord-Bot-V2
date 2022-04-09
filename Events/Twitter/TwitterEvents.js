const { MessageEmbed, WebhookClient } = require("discord.js")
const Twitter = require('twitter')
const client = require("../../main")
require('dotenv').config()

module.exports.name = "twitterEvents"

const twitter = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_TOKEN_SECRET,
    
});

twitter.stream('statuses/filter', { follow: '306490355' }, async function(stream) {
    await stream.on('data', function(tweet) {
        try {
            if (!tweet.retweeted_status & !tweet.in_reply_to_user_id) return twitterPost(tweet);
        } catch (error) {
            console.log(`An error occured on stream.on: 'data'\n${error}`)
        }
    });
    
    await stream.on('error', function(error) {
        console.log(`An error occured on stream.on: 'error'`);
        throw error;
    });
})

function twitterPost(tweet) {
    try {
        let media, text;

        if (!tweet.extended_tweet) {
            media = tweet.entities.media;
            text = tweet.text;
        } else {
            media = tweet.extended_tweet.entities.media;
            text = tweet.extended_tweet.full_text;
        }

        const webhook = new WebhookClient({
            id: process.env.TWEET_NOTIF_ID,
            token: process.env.TWEET_NOTIF_TOKEN
        });

        var post = new MessageEmbed()
        .setColor("BLUE")
        .setAuthor({
            name: `${tweet.user.name} (@${tweet.user.screen_name})`, 
            iconURL: `${tweet.user.profile_image_url}`, 
            url: `https://twitter.com/${tweet.user.screen_name}`
        })
        .setDescription(`${text}`)
        .setTimestamp()
        .setURL(`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`)
        .setFooter({ text: `Twitter`, iconURL: `https://abs.twimg.com/favicons/twitter.ico` })

        if (!!media) for (var j = 0; j < media.length; j++) post.setImage(media[j].media_url)

        return webhook.send({embeds: [post]}).catch((err) => console.log(err));
    } catch (error) {
        return console.log(`an error occured on posting twitter notification\n${error}`)
    }
}