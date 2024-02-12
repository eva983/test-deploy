import {useWorkoutsContext } from "./useWorkoutsContext";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch} = useWorkoutsContext();

  const logout = () => {
    // Remove user from local storage
    localStorage.removeItem('user');

    // Dispatch logout action
    dispatch({ type: 'LOGOUT' });
    workoutsDispatch({type: 'SET_WORKOUTS',payload: null})
  };

  return {logout};
};
