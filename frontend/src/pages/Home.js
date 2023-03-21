import { useEffect } from "react";
import { useRequestsContext } from "../hooks/useRequestsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import RequestDetails from "../components/RequestDetails";
import RequestForm from "../components/RequestForm";

const Home = () => {
  const { requests, dispatch } = useRequestsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await fetch("/api/requests", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_REQUESTS", payload: json });
      }
    };

    if (user) {
      fetchRequests();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="requests">
        {requests &&
          requests.map((request) => (
            <RequestDetails key={request._id} request={request} />
          ))}
      </div>
      <RequestForm />
    </div>
  );
};

export default Home;
