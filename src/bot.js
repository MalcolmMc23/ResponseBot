// https://www.youtube.com/watch?v=6IgOXmQMT68 
//i stopped at 16:47 

require("dotenv").config();
const { token } = process.env;
const { Client, Collection, GatewayIntentBits } = require("discord.js")
const fs = require("fs")

const client = Client({ intense: GatewayIntentBits.Guilds })
client.commands = new Collection();
client.commandArray = []

const functionFolders = fs.readdirSync("./src/functions")
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync('./src/functions/${folder}')
        .filter(file => file.endsWith(".js"));
    for (const file of functionFiles)
        require('./functions/${folder}/${file}')(client)
}