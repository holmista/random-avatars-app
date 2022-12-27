import React, { useEffect } from "react";
import { useMutation } from "react-query";
import LoadingSpinnerForComponents from "../common/LoadingSpinnerForComponents";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../form/ErrorMessage";
import { AxiosResponse } from "axios";

interface ApproveButtonProps {
  apiCall: () => Promise<AxiosResponse<any, any>>;
}

const ApproveButton: React.FC<ApproveButtonProps> = ({ apiCall }) => {
  const navigate = useNavigate();
  const mutation = useMutation("approveResource", apiCall);
  useEffect(() => {
    if (mutation.isSuccess) {
      navigate("/admin/unapproved-resources");
    }
  }, [mutation]);
  if (mutation.isError) {
    <ErrorMessage success={true} status="could not approve resource" />;
  }
  return (
    <button
      onClick={() => mutation.mutate()}
      className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white flex justify-center items-center gap-6  w-36"
    >
      <p>Approve</p>
      {mutation.isLoading && <LoadingSpinnerForComponents size={15} />}
      {!mutation.isLoading && (
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
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </button>
  );
};

export default ApproveButton;
