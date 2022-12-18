import React, { useState } from "react";
import ImageUploadInput from "../components/form/ImageUploadInput";
import Image from "../components/form/Image";

const Form: React.FC = () => {
  const [images, setImages] = useState<Blob[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setImages([...images, ...files]);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) return;
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });
  };

  return (
    <form className="w-full max-w-lg mx-auto my-10">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            htmlFor="images"
            className="block uppercase tracking-wide text-purple-700 text-xs font-bold mb-2"
          >
            Choose images
          </label>
          <div className="relative">
            <ImageUploadInput onChange={handleChange} />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        {images.map((image, index) => (
          <Image
            key={index}
            src={URL.createObjectURL(image)}
            onRemove={() => setImages(images.filter((_, i) => i !== index))}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={(e: React.FormEvent) => submit(e)}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
