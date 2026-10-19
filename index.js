import 'dotenv/config';
import { ActivityType, Client, GatewayIntentBits } from 'discord.js';

const token = process.env.DISCORD_BOT_TOKEN?.trim();
const TEST_DM_USER_ID = '1033453785416208564';

if (!token) {
  console.error('ERROR: DISCORD_BOT_TOKEN is missing.');
  process.exit(1);
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const startedAt = Date.now();

function applyPresence() {
  if (!client.user) return;

  client.user.setPresence({
    status: 'dnd',
    activities: [
      {
        name: 'Le Mans Ultimate',
        type: ActivityType.Playing,
        timestamps: {
          start: startedAt
        }
      }
    ],
    afk: false
  });
}

client.once('ready', async () => {
  applyPresence();

  console.log(`Logged in as ${client.user.tag}`);
  console.log('Status: DND');
  console.log('Activity: Playing Le Mans Ultimate');
  console.log('Elapsed timer: enabled');

  try {
    const user = await client.users.fetch(TEST_DM_USER_ID);
    await user.send('Test erfolgreich: Der Discord-Bot kann dir Direktnachrichten senden.');
    console.log(`One-time test DM sent to ${TEST_DM_USER_ID}`);
  } catch (error) {
    console.error('Failed to send one-time test DM:', error?.message || error);
  }
});

client.on('error', error => {
  console.error('Discord client error:', error);
});

process.on('unhandledRejection', error => {
  console.error('Unhandled rejection:', error);
});

client.login(token).catch(error => {
  console.error(
    'Discord login failed:',
    error?.message || error
  );

  process.exit(1);
});