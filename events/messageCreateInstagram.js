const { Events } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

const instagramId = "675763397593399296";
const allowed_links = "^((https:\/\/)|(www\.))";

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
		if (message.author.bot) return;
        if (message.channelId === instagramId) {
            if (message.attachments.first()) return;
            if (message.content.match(allowed_links)) return;
            const reply = await message.reply({ content: "Seul les images et liens sont autorisés" });
            await message.delete();
            await wait(4_000);
            await reply.delete();
        }
	},
};