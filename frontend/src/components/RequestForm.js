import { useState } from "react";
import { useRequestsContext } from "../hooks/useRequestsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const RequestForm = () => {
  const { dispatch } = useRequestsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [areas, setAreas] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const request = { title, load, areas };

    const response = await fetch("/api/requests", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setLoad("");
      setAreas("");
      setError(null);
      setEmptyFields([]);
      console.log("new request added", json);
      dispatch({ type: "CREATE_REQUEST", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New request</h3>

      <label>Vehicle type:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Max load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
      />

      <label>Area:</label>
      <input
        type="text"
        onChange={(e) => setAreas(e.target.value)}
        value={areas}
        className={emptyFields.includes("areas") ? "error" : ""}
      />

      <button>Add Request</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default RequestForm;
