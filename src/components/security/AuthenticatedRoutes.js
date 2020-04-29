import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useStateValue } from "../../sesion/store";

function AuthenticatedRoutes({
  component: Component,
  FirebaseAuthenticate,
  ...rest
}) {
  const [{ isAuthenticated }, dispatch] = useStateValue();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated === true || FirebaseAuthenticate !== null ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    />
  );
}
export default AuthenticatedRoutes;
