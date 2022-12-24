import React from "react";
import { useNavigate } from "react-router-dom";

interface CardProps {
  text: string;
}

const ResourceCard: React.FC<CardProps> = ({ text }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/admin/unapproved-resources/${text}`);
  };
  return (
    <div
      onClick={handleClick}
      className="max-w-sm rounded shadow-lg m-4 bg-[#806ef9] hover:bg-purple-700 hover:cursor-pointer"
    >
      <p className="p-4">{text}</p>
    </div>
  );
};

export default ResourceCard;
