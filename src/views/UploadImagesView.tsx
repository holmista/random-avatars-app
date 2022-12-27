import React from "react";
import axios from "axios";
import ImageUploadInput from "../components/form/ImageUploadInput";
import Image from "../components/form/Image";
import ErrorMessage from "../components/form/ErrorMessage";
import { Formik, Form as FormF, Field } from "formik";
import { useMutation } from "react-query";

interface FormValues {
  name: string;
  images: Blob[];
}

interface Errors {
  name?: string;
  images?: string;
}

const validate = (values: FormValues) => {
  const errors: Errors = {};
  if (!values.name) {
    errors.name = "name is Required";
  }
  if (values.images.length !== 10) {
    errors.images = "10 images should be uploaded";
  }
  return errors;
};

const Form: React.FC = () => {
  const createRawImages = (data: FormValues) => {
    const formData = new FormData();
    console.log(data.images);
    data.images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("resource", data.name);
    for (const key of formData.keys()) {
      console.log(key);
    }
    return axios.post(`${import.meta.env.VITE_BACK_URL}/images`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const mutation = useMutation("createRawImages", createRawImages);
  const initialFormValues: FormValues = { name: "", images: [] };

  return (
    <Formik
      onSubmit={async (values, { resetForm }) => {
        mutation.mutate(values);
        if (mutation.data) {
          resetForm();
        }
      }}
      initialValues={initialFormValues}
      validate={validate}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ errors, handleChange, values, setFieldValue, resetForm }) => (
        <FormF className="w-full max-w-lg mx-auto py-10">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                htmlFor="images"
                className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              >
                Choose images
              </label>
              <div className="relative">
                <ImageUploadInput
                  onChange={(e) => {
                    e.target.files &&
                      setFieldValue("images", [
                        ...values.images,
                        ...e.target.files,
                      ]);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            {values.images.map((image, index) => (
              <Image
                key={index}
                src={URL.createObjectURL(image)}
                onRemove={() => {
                  console.log("removed");
                  setFieldValue(
                    "images",
                    values.images.filter((_, i) => i !== index)
                  );
                }}
              />
            ))}
          </div>
          <div className="relative rounded-md shadow-sm">
            <Field
              className="form-input py-3 px-4 block w-full leading-5 rounded-md purple-500 placeholder-[#534e54] focus:outline-none focus:shadow-outline-purple transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              placeholder="name"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
          </div>
          {errors.name && <ErrorMessage status={errors.name} success={false} />}
          {errors.images && (
            <ErrorMessage status={errors.images} success={false} />
          )}
          {mutation.data && (
            <ErrorMessage
              status="resource added successfully, wait till reviewed"
              success={true}
            />
          )}
          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className="bg-[#806ef9] hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full mb-60"
            >
              Submit
            </button>
          </div>
        </FormF>
      )}
    </Formik>
  );
};

export default Form;
