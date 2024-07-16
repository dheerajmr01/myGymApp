import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [workoutLists, setWorkoutLists] = useState([]);

  useEffect(() => {
    const fetchWorkoutLists = async () => {
      try {
        const response = await fetch("/api/forms");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setWorkoutLists(data);
      } catch (error) {
        console.error("Error fetching workout lists:", error);
      }
    };

    fetchWorkoutLists();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const workout = { title, load, reps };

    const response = await fetch("/api/workouts", {
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
      setEmptyFields(json.emptyFields);
    } else {
      setEmptyFields([]);
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);

      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Exercise Title:</label>
      <select
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={
          Array.isArray(emptyFields) && emptyFields.includes("title")
            ? "error"
            : ""
        }
      >
        <option value="">Select an exercise...</option>
        {workoutLists.map((list) => (
          <option key={list._id} value={list.title}>
            {list.title}
          </option>
        ))}
      </select>

      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={
          Array.isArray(emptyFields) && emptyFields.includes("load")
            ? "error"
            : ""
        }
      />

      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={
          Array.isArray(emptyFields) && emptyFields.includes("reps")
            ? "error"
            : ""
        }
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;

/// IF drop down needs to have autocomplete as we type we use the below code: it has debouncing ie loading after inteval of the input

// import { useEffect, useRef, useState } from "react";
// import { useAuthContext } from "../hooks/useAuthContext";
// import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// const workoutNames = [
//   "Push-ups",
//   "Squats",
//   "Burpees",
//   "Lunges",
//   "Plank",
//   "Jumping Jacks",
//   "Mountain Climbers", // Add more workout names here
// ];

// const WorkoutForm = () => {
//   const { dispatch } = useWorkoutsContext();
//   const { user } = useAuthContext();
//   const [title, setTitle] = useState("");
//   const [load, setLoad] = useState("");
//   const [reps, setReps] = useState("");
//   const [error, setError] = useState(null);
//   const [emptyFields, setEmptyFields] = useState([]);
//   const [filteredWorkouts, setFilteredWorkouts] = useState([]);
//   const [isDropdownVisible, setIsDropdownVisible] = useState(false);
//   const inputRef = useRef(null);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       if (title) {
//         const filtered = workoutNames.filter((workout) =>
//           workout.toLowerCase().includes(title.toLowerCase())
//         );
//         setFilteredWorkouts(filtered);
//       } else {
//         setFilteredWorkouts([]);
//       }
//     }, 300); // 300ms debounce delay

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [title]);

//   const handleInputChange = (event) => {
//     setTitle(event.target.value);
//     setIsDropdownVisible(true);
//   };

//   const handleSelectWorkout = (workout) => {
//     setTitle(workout);
//     setIsDropdownVisible(false);
//   };

//   const handleBlur = (e) => {
//     // Check if the clicked element is not part of the dropdown
//     if (dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget)) {
//       setTimeout(() => {
//         setIsDropdownVisible(false);
//       }, 100); // Small timeout to allow click on dropdown items
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user) {
//       setError("You must be logged in");
//       return;
//     }

//     const workout = { title, load, reps };

//     const response = await fetch("/api/workouts", {
//       method: "POST",
//       body: JSON.stringify(workout),
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${user.token}`,
//       },
//     });
//     const json = await response.json();

//     if (!response.ok) {
//       setError(json.error);
//       setEmptyFields(json.emptyFields);
//     }
//     if (response.ok) {
//       setEmptyFields([]);
//       setTitle("");
//       setLoad("");
//       setReps("");
//       setError(null);

//       dispatch({ type: "CREATE_WORKOUT", payload: json });
//     }
//   };

//   return (
//     <form
//       className="create"
//       onSubmit={handleSubmit}
//       style={{ position: "relative" }}
//     >
//       <h3>Add a New Workout</h3>

//       <label>Exercise Title:</label>
//       <input
//         ref={inputRef}
//         type="text"
//         onChange={handleInputChange}
//         value={title}
//         onFocus={() => setIsDropdownVisible(true)}
//         onBlur={handleBlur}
//         className={
//           Array.isArray(emptyFields) && emptyFields.includes("title")
//             ? "error"
//             : ""
//         }
//         autoComplete="off"
//       />
//       {isDropdownVisible && filteredWorkouts.length > 0 && (
//         <ul ref={dropdownRef} className="dropdown-list">
//           {filteredWorkouts.map((workout, index) => (
//             <li
//               key={index}
//               onMouseDown={() => handleSelectWorkout(workout)}
//               className="dropdown-item"
//             >
//               {workout}
//             </li>
//           ))}
//         </ul>
//       )}

//       <label>Load (in kg):</label>
//       <input
//         type="number"
//         onChange={(e) => setLoad(e.target.value)}
//         value={load}
//         className={
//           Array.isArray(emptyFields) && emptyFields.includes("load")
//             ? "error"
//             : ""
//         }
//       />

//       <label>Reps:</label>
//       <input
//         type="number"
//         onChange={(e) => setReps(e.target.value)}
//         value={reps}
//         className={
//           Array.isArray(emptyFields) && emptyFields.includes("reps")
//             ? "error"
//             : ""
//         }
//       />

//       <button>Add Workout</button>
//       {error && <div className="error">{error}</div>}
//     </form>
//   );
// };

// export default WorkoutForm;
