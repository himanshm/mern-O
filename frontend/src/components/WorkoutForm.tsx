import { ChangeEvent, FormEvent, useState } from 'react';
import { useWorkoutContext } from '../hooks/useWorkoutContext';

interface Workout {
  title: string;
  load: string;
  reps: string;
}

const initialState: Workout = { title: '', load: '', reps: '' };

function WorkoutForm() {
  const { createWorkout } = useWorkoutContext();
  const [workout, setWorkout] = useState<Workout>(initialState);

  const [error, setError] = useState<string | null>(null);
  const [emptyFields, setEmptyFields] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWorkout({
      ...workout,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formattedWorkout = {
      title: workout.title,
      load: workout.load ? Number(workout.load) : null,
      reps: workout.reps ? Number(workout.reps) : null,
    };

    try {
      const res = await fetch('http://localhost:8080/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedWorkout),
      });

      const createdWorkout = await res.json();

      if (!res.ok) {
        if (createdWorkout.emptyFields) {
          setEmptyFields(createdWorkout.emptyFields);
        }
        throw new Error(createdWorkout.error || 'Failed to add workout!');
      }

      setWorkout(initialState);
      setEmptyFields([]);
      console.log('Workout added successfully', workout);
      createWorkout(createdWorkout);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Excercise Title:</label>
      <input
        type='text'
        name='title'
        onChange={handleChange}
        value={workout.title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Load (in kg):</label>
      <input
        type='number'
        name='load'
        onChange={handleChange}
        value={workout.load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>Reps:</label>
      <input
        type='number'
        name='reps'
        onChange={handleChange}
        value={workout.reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button type='submit'>Add Workout</button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
}

export default WorkoutForm;
