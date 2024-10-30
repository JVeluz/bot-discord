const { Events } = require('discord.js');

const channels_to_clone_ids = [
    "1300934053792317450",
    "1300934098440949770"
];

module.exports = {
	name: Events.VoiceStateUpdate,
	async execute(oldState, newState) {
        if (newState.channel) {
            // Entre dans un channel
            if (!channels_to_clone_ids.includes(newState.channelId)) return;
            const main_channel = newState.channel;
            const category = main_channel.parent;
            const clones = category.children.cache.filter(channel => channel.name === main_channel.name);

            let clone_channel = true;
            clones.each(clone => {
                if (clone.members.size === 0) {
                    clone_channel = false;
                }
            });

            if (clone_channel) {
                await main_channel.clone();
            }
        }
        if (oldState.channel) {
            // Sort d'un channel
            const siblings = oldState.channel.parent.children.cache;
            if (siblings.some(channel => channels_to_clone_ids.includes(channel.id))) {
                const main_channel = oldState.channel;
                const category = main_channel.parent;
                const category_members = category.members;
                
                const clones = category.children.cache.filter(channel => channel.name === main_channel.name);
    
                let count = clones.size - 2;
                clones.each(channel => {
                    if (channels_to_clone_ids.includes(channel.id)) return;
                    if (category_members.size === 0 && count == 0) return;
                    if (channel.members.size === 0) {
                        channel.delete();
                        count--;
                    }
                })
            }
        }
	},
};