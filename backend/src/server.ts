import express, { Express, Request, Response, NextFunction } from 'express';
import 'dotenv/config';

import workoutRoutes from './routes/workout';
import { mongooseConnect } from '../config/database';

// Express app
const app: Express = express();
const port = process.env.PORT;

if (!port) {
  throw new Error('No connection port is provided!');
}

// middlewares
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/workouts', workoutRoutes);

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
