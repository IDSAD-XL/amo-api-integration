const fs = require('fs');
const path = require('path');
// экземпляр Client
const client = require('./client');

// принудительное обновление токена (если ранее не было запросов)
const updateConnection = async () => {
  if (!client.connection.isTokenExpired()) {
    return;
  }
  await client.connection.update();
}

const filePath = path.resolve(__dirname, './token.json');

const init = async () => {
  client.token.on('change', () => {
    const token = client.token.getValue();
    fs.writeFileSync(filePath, JSON.stringify(token));
  });

  if (fs.existsSync(filePath)) {
    try {
      const json = fs.readFileSync(filePath).toString();
      const currentToken = JSON.parse(json);
      client.token.setValue(currentToken);
    } catch (e) {
      // некорректный JSON-токен
    }
  }

  await client.connection.connect();
}

module.exports.init = init