import express, { Express, Request, Response, NextFunction } from 'express';
import 'dotenv/config';

import workoutRoutes from './routes/workout';

// Express app
const app: Express = express();
const port = process.env.PORT;

if (!port) {
  throw new Error('No connection port is provided!');
}

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/workouts', workoutRoutes);

//Listen for requests
async function initializeServer() {
  try {
    app.listen(port);
    console.log(`Server is listening on port ${port}`);
  } catch (error) {
    console.error('Error Occured!', error);
  }
}

initializeServer();
