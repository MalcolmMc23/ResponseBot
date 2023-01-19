module.exports = {
    name: "interationCreate",
    async execute(interation, client) {
        if (interation.isChatImputCommand()) {
            const { commands } = client
            const { commandsName } = interation
            const command = commands.get(commandsName)
            if (!command) return;

            try {
                await commands.execute(interation, client)
            } catch (error) {
                console.error(error)
                await interation.replay({
                    content: "something went wrong while executing this command!!!",
                    ephemeral: true
                })
            }
        }
    }
}