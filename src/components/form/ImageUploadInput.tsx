import React from "react";

interface ImageUploadInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUploadInput: React.FC<ImageUploadInputProps> = ({ onChange }) => {
  return (
    <label className="px-4 py-2 bg-[#806ef9] text-white rounded-full cursor-pointer hover:bg-purple-700">
      Choose Images
      <input
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={onChange}
      />
    </label>
  );
};

export default ImageUploadInput;
