import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../../context/User.context";

export default function GuestedRoute({ children }) {
  let { token } = useContext(userContext);
  if (token) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}
