import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface LoadingSpinnerForComponents {
  size: number;
}
const LoadingSpinner: React.FC<LoadingSpinnerForComponents> = ({ size }) => {
  return (
    <div className="flex justify-center items-center">
      <ClipLoader color="#00BFFF" size={size} loading={true} />
    </div>
  );
};

export default LoadingSpinner;
