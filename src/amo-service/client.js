const { Client } = require("amocrm-js")

const client = new Client({
  domain: process.env.DOMAIN,
  auth: {
    client_id: process.env.CLIENT_ID, // ID интеграции
    client_secret: process.env.CLIENT_SECRET, // Секретный ключ
    redirect_uri: process.env.REDIRECT_URI, // Ссылка для перенаправления
    code: process.env.CODE
  }
});

module.exports = client