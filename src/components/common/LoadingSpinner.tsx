import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#00BFFF" size={60} loading={true} />
    </div>
  );
};

export default LoadingSpinner;
