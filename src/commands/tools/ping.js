const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("pings you back!"),
    async execute(interation, client) {
        const message = await interation.deferReplay({
            fetchReplay: true,
        })
        const newMessage = "API latency: " + client.ws.ping + "       Clients ping: " + (message.createTimestamp - interation.createTimestamp);
        await interation.editReplay({
            content: newMessage,
        })

    }

}