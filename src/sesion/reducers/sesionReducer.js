export const initialState = {
  user: {
    name: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    id: "",
    pickture: ""
  },
  isAuthenticated: false
}

const sesionReducer = (state = initialState, action) => {
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
        user: action.newUser,
        isAuthenticated: action.isAuthenticated,
      };
    default:
      return state;
  }
}
export default sesionReducer;