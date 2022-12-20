import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

interface Props {
  error: string;
}

const ErrorMessage: React.FC<Props> = ({ error }) => {
  const [showError, setShowError] = useState(true);

  const [props, set] = useSpring(() => ({
    opacity: 0,
    transform: "translate3d(0, -50%, 0)",
  }));

  useEffect(() => {
    set({
      opacity: 1,
      transform: "translate3d(0, 0, 0)",
    });
    const timeoutId = setTimeout(() => {
      setShowError(false);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, []);

  if (!showError) {
    return null;
  }

  return (
    <animated.div
      className="fixed bottom-0 left-0 right-0 p-4 bg-red-500 text-white text-center transition-all duration-500 ease-in-out"
      style={props}
    >
      {error}
    </animated.div>
  );
};

export default ErrorMessage;
