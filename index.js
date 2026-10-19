import 'dotenv/config';
import { ActivityType, Client, GatewayIntentBits } from 'discord.js';

const token = process.env.DISCORD_BOT_TOKEN?.trim();
const REMINDER_USER_ID = '1033453785416208564';
const REMINDER_INTERVAL_MS = 28 * 24 * 60 * 60 * 1000;

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

async function sendReinstallReminder() {
  try {
    const user = await client.users.fetch(REMINDER_USER_ID);
    await user.send(`<@${REMINDER_USER_ID}> Erinnerung: Du musst den Discord-Bot neu aufsetzen, damit er nicht offline geht.`);
    console.log(`28-day reminder sent to ${REMINDER_USER_ID}`);
  } catch (error) {
    console.error('Failed to send 28-day reminder:', error?.message || error);
  }
}

client.once('ready', () => {
  applyPresence();

  console.log(`Logged in as ${client.user.tag}`);
  console.log('Status: DND');
  console.log('Activity: Playing Le Mans Ultimate');
  console.log('Elapsed timer: enabled');
  console.log('28-day DM reminder: enabled');

  setInterval(() => {
    void sendReinstallReminder();
  }, REMINDER_INTERVAL_MS);
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