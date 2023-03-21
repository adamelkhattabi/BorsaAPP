import { createContext, useReducer } from "react";

export const RequestsContext = createContext();

export const requestsReducer = (state, action) => {
  switch (action.type) {
    case "SET_REQUESTS":
      return {
        requests: action.payload,
      };
    case "CREATE_REQUEST":
      return {
        requests: [action.payload, ...state.requests],
      };
    case "DELETE_REQUEST":
      return {
        requests: state.requests.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const RequestsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(requestsReducer, {
    requests: null,
  });

  return (
    <RequestsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RequestsContext.Provider>
  );
};
