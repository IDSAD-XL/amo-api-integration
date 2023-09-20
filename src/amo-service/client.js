const { Client } = require("amocrm-js")
const config = require("../config/config")

const client = new Client({
  domain: config.domain,
  auth: {
    client_id: config.client_id, // ID интеграции
    client_secret: config.client_secret, // Секретный ключ
    redirect_uri: config.redirect_uri, // Ссылка для перенаправления
    code: config.code
  }
});

module.exports = client