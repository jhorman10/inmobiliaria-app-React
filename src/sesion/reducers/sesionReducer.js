import { Switch } from "react-router-dom";

const sesionReducer = (state, action) => {
  switch (action.type) {
    case "SESION_INIT":
      return {
        ...state,
        user: action.sesion,
        isAuthenticated: action.isAuthenticated,
      };

    case "SESION_CHANGE":
      return {
        ...state,
        user: action.newUser,
        isAuthenticated: action.isAuthenticated,
      };
    case "SESION_END":
      return {
        ...state,
        user: action.sesion,
        isAuthenticated: action.isAuthenticated,
      };
    default:
      return state;
  }
};
