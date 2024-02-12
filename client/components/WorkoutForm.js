import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutsContext();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const workout = { title, load, reps };

    const response = await fetch("https://test-backend-xt6n.onrender.com/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []); // Handling possible emptyFields property in the error response
    } else {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);
      console.log("new workout added", json);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Item</h3>

      <label>Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields && emptyFields.includes("title") ? "error" : ""} // Check if emptyFields is defined before accessing includes
      />

      <label>Category:</label>
      <input
        type="text"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields && emptyFields.includes("load") ? "error" : ""} // Check if emptyFields is defined before accessing includes
      />

      <label>Notes:</label>
      <input
        id="notes"
        type="text"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={
          emptyFields && emptyFields.includes("reps notes") ? "error" : ""
        } // Check if emptyFields is defined before accessing includes
      />

      <button>Add</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
