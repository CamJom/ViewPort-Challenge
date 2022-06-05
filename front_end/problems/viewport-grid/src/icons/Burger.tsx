import { useState } from "react";
/**
 * Burger Component
 */
export function Burger() {
  const [view, setView] = useState(false)

  const toggleView = () => {
    setView(!view)
  }

  return (
    <svg className="Icon" viewBox="0 0 100 80" width="20" height="20" onClick={toggleView}>
      <rect width="100" height="20"></rect>
      <rect y="30" width="100" height="20"></rect>
      <rect y="60" width="100" height="20"></rect>
    </svg>
  );
}
