import { MongoClient } from 'mongodb';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;
const IPINFO_API_KEY = process.env.IPINFO_API_KEY;

const client = new MongoClient(uri);

app.use(cors());
app.use(helmet());
const logToDB = async (ipData) => {
  try {
    await client.connect();
    const db = client.db('tracker');
    await db.collection('ip_logs').insertOne(ipData);
  } catch (error) {
    console.error('Error logging to DB:', error);
  } finally {
    await client.close();
  }
};

const getIPLocation = async (ip) => {
  if (ip === '::1' || ip === '127.0.0.1') return 'Localhost';

  try {
    const response = await fetch(`https://ipinfo.io/${ip}/json?token=${IPINFO_API_KEY}`);
    const data = await response.json();
    return data.city && data.region && data.country
      ? `${data.city}, ${data.region}, ${data.country}`
      : 'Unknown';
  } catch (error) {
    console.error('Error fetching IP info:', error);
    return 'Unknown';
  }
};

app.get('*', async (req, res) => {
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;
  const location = await getIPLocation(ip);

  const logEntry = {
    timestamp: new Date(),
    ip,
    userAgent: req.headers['user-agent'],
    location,
    referrer: req.headers['referer'] || 'None'
  };

  await logToDB(logEntry);

  res.send('Request logged successfully');
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
