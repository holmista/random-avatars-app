import React, { useState } from "react";
import axios from "axios";
import ImageUploadInput from "../components/form/ImageUploadInput";
import Image from "../components/form/Image";

const Form: React.FC = () => {
  const [images, setImages] = useState<Blob[]>([]);
  const [name, setName] = useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setImages([...images, ...files]);
    }
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (images.length === 0) return;
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("resource", name);
    try {
      console.log("here");
      const response = await axios.post(
        `${import.meta.env.VITE_BACK_URL}/images`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="w-full max-w-lg mx-auto my-10" onSubmit={(e) => submit(e)}>
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
      <div className="relative rounded-md shadow-sm">
        <input
          className="form-input py-3 px-4 block w-full leading-5 rounded-md purple-500 placeholder-purple-500 focus:outline-none focus:shadow-outline-purple transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          placeholder="name"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div className="flex justify-center mt-10">
        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
