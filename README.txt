LMU DISCORD PRESENCE BOT - WISPBYTE V2

FILES TO PUT IN /home/container:
- index.js
- package.json
- .env is created/managed by Wispbyte Environment

WISPBYTE SETTINGS
1. Docker image: nodejs_20
2. JS_FILE: index.js
3. Environment -> File Location: .env
4. Add variable:
   KEY: DISCORD_BOT_TOKEN
   VALUE: your real Discord bot token
5. Click Save changes.
6. Stop the server, then Start it again.

DO NOT rename .env.example to .env if Wispbyte already manages .env.
DO NOT upload your real bot token to GitHub or share it in chat.

EXPECTED OUTPUT
Logged in as <bot>
Status: DND
Activity: Playing Le Mans Ultimate

DISCORD PRESENCE
- Status: DND
- Activity type: Playing
- Activity: Le Mans Ultimate
