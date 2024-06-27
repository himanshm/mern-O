import express, { Express, Request, Response, NextFunction } from 'express';
import 'dotenv/config';

import workoutRoutes from './routes/workout';
import userRoutes from './routes/user';

import { mongooseConnect } from '../config/database';

// Express app
const app: Express = express();
const port = process.env.PORT;

if (!port) {
  throw new Error('No connection port is provided!');
}

// CORS middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// middlewares
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

//Listen for requests
async function initializeServer() {
  try {
    await mongooseConnect();
    app.listen(port);
    console.log(`Server is listening on port ${port}`);
  } catch (error) {
    console.error('Error Occured!', error);
  }
}

initializeServer();
