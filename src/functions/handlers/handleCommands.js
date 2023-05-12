const { REST } = require("@discordjs/rest")
const { Routes } = require('discord-api-types/v10')
// const { REST, Routes } = require('discord.js');

const fs = require("node:fs");


module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync('./src/commands')
        for (folder of commandFolders) {
            const commandFiles = fs
                .readdirSync('./src/commands/' + folder)
                .filter(file => file.endsWith(".js"))
            const { commands, commandArray } = client
            for (const file of commandFiles) {
                const command = require('../../commands/' + folder + '/' + file)
                commands.set(command.data.name, command)
                // commandArray.push(command, command.data.toJSON())
                commandArray.push(command.data.toJSON())
                console.log('Command: ' + command.data.name + 'has been past through the handler')
            }
        }
        const clientId = '929620006457720862';
        const guildId = '929620373400592384';
        // const rest = new REST({ version: "10" }).setToken(process.env.token)
        const rest = new REST({ version: '10' }).setToken(process.env.token);


        try {
            console.log("Start crefreshing application (/) commands.");

            // console.log("  $$$$$$$$$" + Routes.applicationGuildCommands(clientId, guildId))

            await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: client.commandArray },
            );

            console.log("Succesfully reloaded application (/) commands.");

        } catch (error) {
            console.error(error)

        }

        // (async () => {
        //     try {
        //         // console.log(`Started refreshing ${commands.length} application (/) commands.`);
        //         console.log(`Started refreshing commands.length application (/) commands.`);

        //         // The put method is used to fully refresh all commands in the guild with the current set
        //         const data = await rest.put(
        //             Routes.applicationGuildCommands(clientId, guildId),
        //             { body: client.commandArray },
        //         );

        //         console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        //     } catch (error) {
        //         // And of course, make sure you catch and log any errors!
        //         console.error(error);
        //     }
        // })();
    }
}