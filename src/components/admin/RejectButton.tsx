const RejectButton = () => {
  return (
    <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white flex justify-center items-center gap-6 w-36">
      <p>Reject</p>
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
