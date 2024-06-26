import { createContext, ReactNode, useReducer, useMemo } from 'react';

export type Workout = {
  _id: string;
  title: string;
  reps: number;
  load: number;
  createdAt: string;
};

export type WorkoutState = {
  workouts: Workout[];
};

export type WorkoutContextType = WorkoutState & {
  createWorkout: (workout: Workout) => void;
  setWorkouts: (workouts: Workout[]) => void;
  deleteWorkout: (deletedWorkout: Workout) => void;
};

export const WorkoutContext = createContext<WorkoutContextType | undefined>(
  undefined
);

type ContextProviderProps = {
  children: ReactNode;
};

const initialState: WorkoutState = {
  workouts: [],
};

type SetWorkoutsAction = {
  type: 'SET_WORKOUTS';
  payload: Workout[];
};

type CreateWorkoutAction = {
  type: 'CREATE_WORKOUT';
  payload: Workout;
};

type DeleteWorkoutAction = {
  type: 'DELETE_WORKOUT';
  payload: Workout;
};

type WorkoutAction =
  | SetWorkoutsAction
  | CreateWorkoutAction
  | DeleteWorkoutAction;

function workoutsReducer(
  state: WorkoutState,
  action: WorkoutAction
): WorkoutState {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        workouts: action.payload,
      };
    case 'CREATE_WORKOUT':
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
}

function WorkoutContextProvider({ children }: ContextProviderProps) {
  const [workoutState, workoutDispatch] = useReducer(
    workoutsReducer,
    initialState
  );

  function handleCreateNewWorkout(workout: Workout) {
    workoutDispatch({
      type: 'CREATE_WORKOUT',
      payload: workout,
    });
  }

  function handleShowAllWorkouts(workouts: Workout[]) {
    workoutDispatch({
      type: 'SET_WORKOUTS',
      payload: workouts,
    });
  }

  function handleWorkoutDeletion(deletedWorkout: Workout) {
    workoutDispatch({
      type: 'DELETE_WORKOUT',
      payload: deletedWorkout,
    });
  }

  const contextValue = useMemo(
    () => ({
      workouts: workoutState.workouts,
      createWorkout: handleCreateNewWorkout,
      setWorkouts: handleShowAllWorkouts,
      deleteWorkout: handleWorkoutDeletion,
    }),
    [workoutState.workouts]
  );

  return (
    <WorkoutContext.Provider value={contextValue}>
      {children}
    </WorkoutContext.Provider>
  );
}

export default WorkoutContextProvider;
