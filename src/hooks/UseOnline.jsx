import { useState } from "react";

export default function UseOnline() {
  const [isOnline, setIsOnline] = useState(true);
  window.addEventListener("online", () => {
    setIsOnline(true);
  });
  window.addEventListener("offline", () => {
    setIsOnline(false);
  });
  return isOnline;
}
