import { useEffect, useState } from 'react';

// Components
import WorkoutDetails from '../components/WorkoutDetails';

// Type Defs
export type Workout = {
  _id: string;
  title: string;
  reps: string;
  load: string;
  createdAt: string;
};

function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[] | null>(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const res = await fetch('http://localhost:8080/api/workouts');

      const resData = await res.json();

      if (res.ok) {
        setWorkouts(resData);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className='home'>
      <div className='workouts'>
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
    </div>
  );
}

export default HomePage;
