const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')
const token = '5619901902:AAEX99LqPQXLveOasOcI_V-Q4FqJrmF9Gi0'

const bot = new TelegramApi(token, {polling: true})

const chats = {}



const startGame = async (chatid) => {
    await bot.sendMessage(chatid, 'Now I will guess a number from 0 to 9')
    const randomNamber = Math.floor(Math.random() * 10)
    chats[chatid] = randomNamber;
    await bot.sendMessage(chatid, 'guess', gameOptions)
}

const start = () => {
    bot.setMyCommands( [
        {command: '/start', description: 'Start hello'},
        {command: '/info', description: 'Get information users'},
        {command: '/game', description: 'Guess game'}
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatid = msg.chat.id;
    
        if (text === '/start') {
            // await bot.sendSticker(chatid, 'https://tlgrm.ru/_/stickers/dc7/a36/dc7a3659-1457-4506-9294-0d28f529bb0a/11.jpg')
            return bot.sendMessage(chatid, `Welcome to the Artemieva beauti`)
        }
        if (text === '/info') {
            return bot.sendMessage(chatid, `Your name ${msg.from.first_name} ${msg.from.last_name}`)
        }
        if(text === '/game') {
            return startGame(chatid);
        }
        return bot.sendMessage(chatid, 'Dontn anderstend command')
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatid = msg.message.chat.id;
        if(data === '/again') {
            return startGame(chatid)
        }
        if(data === chats[chatid]) {
            return await bot.sendMessage(chatid, `Congratulations! You guessed the number! ${chats[chatid]}`, againOptions)
        } else {
            return bot.sendMessage(chatid, `Unfortunately, you didn't guess, the bot guessed the number ${chats[chatid]}`, againOptions)
        }
        bot.sendMessage(chatid, `You chose a number ${data}`)
    })

}

start()