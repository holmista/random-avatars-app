const ApproveButton = () => {
  return (
    <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white flex justify-center items-center gap-6  w-36">
      <p>Approve</p>
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
    </button>
  );
};

export default ApproveButton;
