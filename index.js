/*
* Entry point for the kbot ITAS discord bot
*
*/
const Discord = require('discord.js');
const config = require("./config.js");
const helpers = require('./helpers');

console.log('index.js has started!');
const client = new Discord.Client();


client.on("ready", () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
    // Example of changing the bot's playing game to something useful. `client.user` is what the
    // docs refer to as the "ClientUser".
    //client.user.setActivity(`Serving ${client.guilds.size} servers`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
  });

client.on("message", async message => {
    //Ignore other bots
    if(message.author.bot) return;

    //Ignore if not a prefix
    if(!message.content.startsWith(config.prefix)) return;

    //slice off the prefix, trim whitespace from ends, and split into array by whitespace
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === "ping") {
        // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
        // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    }

    if(command === "say") {
        // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
        // To get the "message" itself we join the `args` back into a string with spaces: 
        const sayMessage = args.join(" ");
        // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
        message.delete().catch(O_o=>{
            console.log(O_o);
        }); 
        // And we get the bot to say the thing: 
        message.channel.send(sayMessage);
    }

    if(command === "joke") {
        let joke = 'No joke for you';
        try{
            joke = await helpers.getJoke();
            console.log(joke);
        } catch (error) {
            console.log(error);
        }
        message.channel.send(joke);
    }
});

client.login(config.discord.botToken);