const { Telegraf, Markup } = require('telegraf');
const axios = require('axios');

const { helpText } = require('./constants');
const params = require('./params');
const welcomeActions = require('./welcomeActions');
const getText = require('./getText');
const isString = require('./isString');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) =>
  ctx.reply(
    'Welcome stranger. This is a bot specially build for you to see your current weather. \n\nType /help to see all the available actions. \n\nType a city name or click on a predefined city below:',
    {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        Markup.button.callback('London', 'london'),
        Markup.button.callback('New York', 'new york'),
        Markup.button.callback('Bucharest', 'bucharest'),
        Markup.button.callback('Paris', 'paris'),
      ]),
    }
  )
);

bot.action(welcomeActions, (ctx) => {
  axios
    .get(process.env.WEATHER_API, {
      params: {
        ...params,
        appid: process.env.WEATHER_KEY,
        q: ctx.update.callback_query.data,
      },
    })
    .then((current) => {
      return ctx.reply(getText(current.data));
    })
    .catch((_error) => {
      return ctx.reply(helpText);
    });
});

bot.help((ctx) => {
  return ctx.reply(
    'Here is a full list of available actions:\n/start - start from the beginning'
  );
});

bot.on('text', (ctx) => {
  if (isString(ctx.update.message.text)) {
    axios
      .get(process.env.WEATHER_API, {
        params: {
          ...params,
          appid: process.env.WEATHER_KEY,
          q: ctx.update.message.text,
        },
      })
      .then((current) => {
        return ctx.reply(getText(current.data));
      })
      .catch((_error) => {
        return ctx.reply(helpText);
      });
  }
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
