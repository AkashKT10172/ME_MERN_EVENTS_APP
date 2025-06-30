const dotenv = require('dotenv');
const Redis = require('ioredis');
dotenv.config();

const redis = new Redis(process.env.REDIS_URL, {tls: {}});

module.exports = redis;
