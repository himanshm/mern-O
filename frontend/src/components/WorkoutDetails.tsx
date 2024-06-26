import { type Workout } from '../context/WorkoutsContext';
import { useWorkoutContext } from '../hooks/useWorkoutContext';

// Type Defs
type WorkoutDetailsProps = {
  workout: Workout;
};

function WorkoutDetails({ workout }: WorkoutDetailsProps) {
  const { deleteWorkout } = useWorkoutContext();
  const { title, reps, load, createdAt } = workout;

  const handleDelete = async () => {
    const res = await fetch(
      `http://localhost:8080/api/workouts/${workout._id}`,
      { method: 'DELETE' }
    );

    const deletedWorkout = await res.json();

    if (res.ok) {
      deleteWorkout(deletedWorkout);
    }
  };
  return (
    <div className='workout-details'>
      <h4>{title}</h4>
      <p>
        <strong>Load (kg): </strong> {load}
      </p>
      <p>
        <strong>Reps: </strong> {reps}
      </p>
      <p>{createdAt}</p>
      <span onClick={handleDelete}>Delete</span>
    </div>
  );
}

export default WorkoutDetails;
