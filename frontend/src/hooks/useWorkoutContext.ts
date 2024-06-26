import { useContext } from 'react';
import { WorkoutContext } from '../context/WorkoutsContext';

export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error(
      'useWorkoutContext must be used inside a WorkoutContextProvider.'
    );
  }

  return context;
};
