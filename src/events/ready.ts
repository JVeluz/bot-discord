import { Client, Events } from "discord.js";

export = {
	name: Events.ClientReady,
	once: true,
	execute(client: Client) {
		console.log(`Ready! Logged in as ${client.user?.tag}`);
	},
};
