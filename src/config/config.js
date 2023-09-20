const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Joi = require('joi');

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development').required(),
    PORT: Joi.number().default(3000),
    DOMAIN: Joi.string(),
    CLIENT_ID: Joi.string(),
    CLIENT_SECRET: Joi.string(),
    REDIRECT_URI: Joi.string(),
    CODE: Joi.string()
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  domain: envVars.DOMAIN,
  client_id: envVars.CLIENT_ID,
  client_secret: envVars.CLIENT_SECRET,
  redirect_uri: envVars.REDIRECT_URI,
  code: envVars.CODE
};