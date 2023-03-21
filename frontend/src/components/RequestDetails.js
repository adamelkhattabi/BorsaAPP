import { useRequestsContext } from "../hooks/useRequestsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const RequestDetails = ({ request }) => {
  const { dispatch } = useRequestsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/requests/" + request._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_REQUEST", payload: json });
    }
  };

  return (
    <div className="request-details">
      <h4>{request.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {request.load}
      </p>
      <p>
        <strong>Area: </strong>
        {request.areas}
      </p>
      <p>
        {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default RequestDetails;
