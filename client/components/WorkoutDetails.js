import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedWorkout, setUpdatedWorkout] = useState(workout);

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(`https://test-backend-xt6n.onrender.com/api/workouts/${workout._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  const handleUpdate = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedWorkout((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(
      `fetch('https://test-backend-xt6n.onrender.com/api/workouts')/${updatedWorkout._id}`,
      {
        method: "PATCH", // or 'PUT' depending on your backend implementation
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(updatedWorkout),
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_WORKOUT", payload: json });
      setIsEditing(false);
    }
  };

  return (
    <div className="workout-details">
      {isEditing ? (
        <div>
          <input
            type="text"
            name="title"
            value={updatedWorkout.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="load"
            value={updatedWorkout.load}
            onChange={handleChange}
          />
          <input
            type="text"
            name="reps"
            value={updatedWorkout.reps}
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Save</button>
        </div>
      ) : (
        <div>
          <h4>{workout.title}</h4>
          <p>
            <strong>Category: </strong>
            {workout.load}
          </p>
          <p>
            <strong></strong>
            {workout.reps}
          </p>
          <p>
            {formatDistanceToNow(new Date(workout.createdAt), {
              addSuffix: true,
            })}
          </p>
          <span className="material-symbols-outlined " onClick={handleClick}>
            delete
          </span>
          <span
            className="material-symbols-outlined edit-icon"
            onClick={handleUpdate}
          >
            edit
          </span>
        </div>
      )}
    </div>
  );
};

export default WorkoutDetails;
