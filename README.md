# S.S.S DISCORD BOT
Discord bot for Rise of Monster Slayer (S.S.S), a Monster Hunter Community from Indonesia. This bot is using slash commands and discord music bot. Purpose of this bot is to manage S.S.S Discord Server.

## Install Dependencies
This bot is using discord.js v13 and requires Node 16.6 or higher to use.
```
npm i discord.js
npm i dotenv
npm i glob
npm i ascii-table
npm i mongoose
npm i canvas
nmp i node-cron
npm i ytdl-core
npm i yt-search
npm i libsodium-wrappers
npm i ffmpeg-static
npm i distube
npm i @discordjs/opus
npm i @distube/yt-dlp
npm i @distube/spotify
npm i @distube/soundcloud
npm i sourcebin
```

## Create .env File
This bot is using .env, make sure you create your own .env file to use all function of this bot just like bellow.
```
BOT_TOKEN = your bot token

DATABASE_URL = your database url

DEV_ID = your discord id
GUILD_ID = your guild/server id

WELCOME_ID = your welcome webhook id
WELCOME_TOKEN = yourwelcome webhook token

GOODBYE_ID = your goodbye webhook id
GOODBYE_TOKEN = your goodbye webhook token

TWEET_NOTIF_ID = your tweet notif webhook id
TWEET_NOTIF_TOKEN = your tweet notif webhook id

TWITTER_CONSUMER_KEY = your twitter consumer key
TWITTER_CONSUMER_SECRET = your twitter consumer secret
TWITTER_TOKEN = your twitter token
TWITTER_TOKEN_SECRET = your twitter token secret

RULES_ID = your rules channel id
ROLES_ID = your roles channel id
GREETINGS_ID = your greetings channel id
CHANNEL_LOGS_ID = your logs channel id
SHARE_LINK_ID = your share link channel id
SHIT_POST_ID = your shit post channel id

ROLE_SSS_SLAYER_ID = your role id for member of server
```
About the channel's id, you don't have to follow the exact same what's on above, you can change whatever you want but make sure you check all commands and events file and change it what you need.

Copy this to your file when you using process.env
```js 
require('dotenv').config()
```