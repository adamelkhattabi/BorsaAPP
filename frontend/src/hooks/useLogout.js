import { useAuthContext } from "./useAuthContext";
import { useRequestsContext } from "./useRequestsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: RequestsDispatch } = useRequestsContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    RequestsDispatch({ type: "SET_REQUESTS", payload: null });
  };

  return { logout };
};
