import mongoose, { Schema, Model, Document } from 'mongoose';

interface IWorkout extends Document {
  title: string;
  reps: number;
  load: number;
}

type WorkoutModel = Model<IWorkout>;

const workoutSchema = new Schema<IWorkout, WorkoutModel>(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Workout = mongoose.model<IWorkout, WorkoutModel>(
  'Workout',
  workoutSchema
);

export default Workout;
