import { Events, Message } from "discord.js";
import { setTimeout } from "node:timers/promises";

module.exports = {
        name: Events.MessageCreate,
        async execute(message: Message) {
                // const instagramId = "675763397593399296";
                const instagramId = "979945319771033610";
                const allowed_links = "^((https:\/\/)|(www\.))";
                if (message.author.bot) return;
                if (message.channelId !== instagramId) return;
                if (message.content.match(allowed_links)) return;
                if (message.attachments.size !== 0) return;

                const reply = await message.reply({ content: "Seul les images et liens sont autorisés" });
                await setTimeout(5000);
                await message.delete();
                await reply.delete();
        },
};

export {}