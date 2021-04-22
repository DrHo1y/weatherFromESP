const config = require('config')
const axios = require('axios')

const { Telegraf } = require('telegraf')
const TOKEN = config.get('token')

// const { session } = Telegraf
const bot = new Telegraf(TOKEN)

// bot.use(session())

// eslint-disable-next-line require-jsdoc
async function getWeather() {
  try {
    const response = await axios.get('http://192.168.4.116/json')
    return response.data
  } catch (error) {
    return error.response.data
  }
}

bot.start(ctx => {
  ctx.replyWithHTML("hello!")
})
bot.command("weather", async ctx => {
  const jsondoc = await getWeather()
  // console.log(jsondoc['sensor3'])
  await ctx.replyWithHTML(` 
Датчик на улице:
  Температура: ${jsondoc['sensor1']['temperature']}°C
  Влажность: ${jsondoc['sensor1']['humidity']}%
Датчик дома:
  Температура: ${jsondoc['sensor2']['temperature']}°C
  Влажность: ${jsondoc['sensor2']['humidity']}%
  `)
})

bot.launch()