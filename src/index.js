require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const mongoose = require('mongoose');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

(async () => {
    try {
        try {
            await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.MONGODB_DATABASE });
            console.log('Connected to DB.');   
        } catch (error) {
            console.log(error + " // Program continues to run...");
        }
        eventHandler(client);
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
})();

client.login(process.env.TOKEN);