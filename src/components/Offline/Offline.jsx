import UseOnline from "../../hooks/UseOnline";

export default function Offline({ children }) {
  let isOnlie = UseOnline();
  if (!isOnlie) {
    return children;
  }
}
