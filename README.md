# S.S.S DISCORD BOT
This is a discord bot for Rise of Monster Slayer (S.S.S). This bot is to manage S.S.S Server, a Monster Hunter Community from Indonesia.

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
npm i @distube/spotify
```

## Create .env File
This bot is using .env, make sure you create your own .env file to use all function of this bot just like bellow.
```
BOT_TOKEN = <bot token>

DATABASE_URL = <database url>

DEV_ID = <your discord id>
GUILD_ID = <guild/server id>

WELCOME_ID = <welcome webhook id>
WELCOME_TOKEN = <welcome webhook token>

GOODBYE_ID = <goodbye webhook id>
GOODBYE_TOKEN = <goodbye webhook token>

RULES_ID = <rules channel id>
ROLES_ID = <roles channel id>
GREETINGS_ID = <greetings channel id>
CHANNEL_LOGS_ID = <logs channel id>
SHARE_LINK_ID = <share link channel id>
SHIT_POST_ID = <shit post channel id>

ROLE_SSS_SLAYER_ID = <role id for member of server>
```
About the channel's id, you don't have to follow the exact same what's on above, you can change whatever you want but make sure you check all commands and events file and change it what you need.

Copy this to your file when you using process.env
```js 
require('dotenv').config()
```