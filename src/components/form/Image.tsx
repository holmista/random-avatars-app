import React, { useState } from "react";

interface ImageProps {
  src: string;
  onRemove: () => void;
}

const Image: React.FC<ImageProps> = ({ src, onRemove }) => {
  const [showRemove, setShowRemove] = useState(false);
  return (
    <div
      className="w-1/3 px-3 mb-6 relative overflow-hidden"
      onMouseOver={() => setShowRemove(true)}
      onMouseOut={() => setShowRemove(false)}
    >
      {showRemove && (
        <p
          className="absolute text text-red-600 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10 hover:cursor-pointer"
          onClick={onRemove}
        >
          remove
        </p>
      )}
      <img
        src={src}
        className="h-64 w-full object-cover rounded-lg shadow-lg hover:bg-purple-700 hover:scale-110 transition-all "
      />
    </div>
  );
};

export default Image;
