import { Navigate } from "react-router-dom";

export default function GuestedRoute({ children }) {
  const token = true;
  if (!token) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}
