const Discord = require("discord.js");
const economy = require('discord-eco')

// CHANGES: fetchBalance → fetchObject
// updateBalance → updateValue
// updateLastDaily → updateText

const client = new Discord.Client();

client.on('ready', () => {
  console.log('Ready')
  client.user.setStatus('Online')
  client.on('error', console.error);
  client.user.setActivity('TokenManager!')
})

client.on('message', message => {
const modRole = 'administrator';
const memberRole = 'Member';

  let prefix = '$';
  let msg = message.content.toUpperCase();
  let cont = message.content.slice(prefix.length).split(" ");
  let args = cont.slice(1);

  // commands

  if (message.content.toUpperCase() === `${prefix}PING`) {
    message.channel.send('pong');
  }

  if (msg.startsWith(`${prefix}GIVE`)) {

    if (!message.member.roles.find("name", modRole)) {
      message.channel.send('**You need the** `' + modRole + '` **to execute this command!**');
      return;
    }

    if (!args[0]) {
      message.channel.send('**You need to define an amount.**')
      return;
    }

    if (isNaN(args[0])) {
      message.channel.send('**The amount has to be a number!**')
      return;
    }

    let definedUser = '';
    if (!args[1]) {
      definedUser = message.author.id;
    } else {
      let firstMentioned = message.mentions.users.first();
      definedUser = firstMentioned.id;
    }

    economy.updateBalance(definedUser, parseInt(args[0])).then((i) =>{
      message.channel.send(`**User defined had ${args[0]} added to their account.**`)
    });

  }

  if (msg.startsWith(`${prefix}TAKE`)) {

    if (!message.member.roles.find("name", modRole)) {
      message.channel.send('**You need the** `' + modRole + '` **to execute this command!**');
      return;
    }

    if (!args[0]) {
      message.channel.send('**You need to define an amount.**')
      return;
    }

    if (isNaN(args[0])) {
      message.channel.send('**The amount has to be a number!**')
      return;
    }

    let definedUser = '';
    if (!args[1]) {
      definedUser = message.author.id;
    } else {
      let firstMentioned = message.mentions.users.first();
      definedUser = firstMentioned.id;
    }

    economy.updateBalance(definedUser, -parseInt(args[0])).then((i) =>{
      message.channel.send(`**User defined had ${args[0]} subtracted from their account.**`)
    });

  }
  //economy.updateBalance(definedUser, -parseInt(args[0])).then((i) =>{

  if (msg === `${prefix}PAY`) {
    if (!message.member.roles.find("name", memberRole)) {
      message.channel.send(`**You need to have the role**` + memberRole + "`**to execute this command!**`")
      return;
    }
    if (!args[0]) {
      message.channel.send('**You need to define an amount.**')
      return;
    }
    if (isNaN(args[0])) {
      message.channel.send('**The amount has to be a number!**')
      return;
    }
    if (economy.fetchBalance(message.author.id) < arg[0]) return message.reply("You don't have enough coins!");

  }

  if (msg === `${prefix}BALANCE`) {

      economy.fetchBalance(message.author.id).then((i) => {
        const embed = new Discord.RichEmbed()
          .setDescription(`**J4Tokens**`)
          .setColor(0xD4AF37)
          .addField('Player', message.author.username,true)
          .addField('Tokens', i.money,true)

          message.channel.send({embed})

      });
    }
  });

client.login(process.env.BOT_TOKEN)
