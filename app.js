import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import contactsRouter from './routes/contactsRouter.js';
import authRouter from './routes/authRouter.js';
import sequelize from './db/sequelize.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/contacts', contactsRouter);
app.use('/api/auth', authRouter);
app.use('/avatars', express.static(path.resolve('public/avatars')));

app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

const { PORT = 3000 } = process.env;

try {
  await sequelize.authenticate();
  console.log('✅ Successfully connected to the database');

  await sequelize.sync();

  app.listen(PORT, () => {
    console.log(`🚀 Server is running. Use our API on port: ${PORT}`);
  });
} catch (error) {
  console.error('❌ DB connection error:', error.message);
  process.exit(1);
}
