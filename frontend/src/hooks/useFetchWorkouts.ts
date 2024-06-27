import { useState, useEffect } from 'react';
import { useWorkoutContext } from './useWorkoutContext';

import { Workout } from '../context/WorkoutsContext';

const useFetchWorkouts = () => {
  const { workouts, setWorkouts } = useWorkoutContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/workouts');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const resData: Workout[] = await res.json();
        setWorkouts(resData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return { workouts, loading, error };
};

export default useFetchWorkouts;
