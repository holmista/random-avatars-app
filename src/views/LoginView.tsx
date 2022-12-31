import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../stores/authSlice";

interface FormValues {
  id: string;
  password: string;
}

interface Errors {
  id?: string;
  password?: string;
}

const validate = (values: FormValues) => {
  const errors: Errors = {};
  if (!values.id) {
    errors.id = "ID is Required";
  }
  if (!values.password) {
    errors.password = "Password is Required";
  }
  return errors;
};

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitForm = async (values: FormValues) => {
    try {
      await axios.post(`${import.meta.env.VITE_BACK_URL}/auth/login`, values, {
        withCredentials: true,
      });
      navigate("/admin/unapproved-resources");
      dispatch(setAuth(true));
    } catch (err) {
      dispatch(setAuth(false));
    }
  };

  const formik = useFormik({
    initialValues: {
      id: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      submitForm(values);
    },
  });

  return (
    <div className="flex justify-center">
      <form onSubmit={formik.handleSubmit} className="flex flex-col w-64 mt-48">
        <input
          type="text"
          id="id"
          name="id"
          className="border-b-2 border-[#3c4564] bg-transparent py-2 px-3 text-[#9ca3af] focus:border-x-0 focus:outline-none"
          placeholder="ID"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.id}
        />
        {formik.touched.id && formik.errors.id ? (
          <div className="text-red-600">{formik.errors.id}</div>
        ) : null}
        <input
          type="password"
          id="password"
          name="password"
          className="border-b-2 border-[#3c4564] py-2 px-3 mt-4 bg-transparent text-[#9ca3af] focus:border-x-0 focus:outline-none"
          placeholder="Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-600">{formik.errors.password}</div>
        ) : null}
        <button
          type="submit"
          className="bg-[#806ef9] hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
