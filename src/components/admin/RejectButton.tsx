import React, { useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import LoadingSpinnerForComponents from "../common/LoadingSpinnerForComponents";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../form/ErrorMessage";

interface ApproveButtonProps {
  apiCall: () => Promise<void>;
}

const RejectButton: React.FC<ApproveButtonProps> = ({ apiCall }) => {
  const navigate = useNavigate();
  const mutation = useMutation("approveResource", apiCall);

  useEffect(() => {
    if (mutation.isSuccess) {
      navigate("/admin/unapproved-resources");
    }
  }, [mutation]);
  if (mutation.isError) {
    <ErrorMessage success={false} status="could not reject resource" />;
  }
  return (
    <button
      onClick={() => mutation.mutate()}
      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white flex justify-center items-center gap-6 w-36"
    >
      <p>Reject</p>
      {mutation.isLoading && <LoadingSpinnerForComponents size={15} />}
      <svg
        className="w-4 h-4 ml-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};

export default RejectButton;
