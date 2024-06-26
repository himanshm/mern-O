import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

import Workout from '../models/workout';
import { error } from 'console';

// Get All workouts
export const getWorkouts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

// Get a single workouts
export const getWorkout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout!' });
  }
  const workout = await Workout.findById({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: 'No such workout!' });
  }

  res.status(200).json(workout);
};

// Create new workout
export const createWorkout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, load, reps } = req.body;

  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    }
  }
};

// Delete a workout
export const deleteWorkout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout!' });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: 'No such workout' });
  }

  res.status(200).json(workout);
};

// Update a workout
export const updateWorkout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout!' });
  }

  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!workout) {
    return res.status(404).json({ error: 'No such workout' });
  }

  res.status(200).json(workout);
};
