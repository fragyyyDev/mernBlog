import { Label, TextInput, Alert } from "flowbite-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SignInStart, SignInSuccess, SignInFailure } from "../app/user/userSlice";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if all fields are filled
    if (!formData.email || !formData.password) {
      return dispatch(SignInFailure('Please fill out all fields.'));
    }

    try {
      dispatch(SignInStart());

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(formData),
      });

      // Check if the response is OK before parsing JSON
      if (!res.ok) {
        const errorResponse = await res.json();
        return dispatch(SignInFailure(errorResponse.message || 'Login failed.'));
      }

      const data = await res.json();
      if (data.success === false) {
        dispatch(SignInFailure(data.message));
      } else {
        dispatch(SignInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(SignInFailure('An error occurred. Please try again.'));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        
        {/* Left Section */}
        <div className="flex-1">
          <Link to="/" className="text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              fragyyy's
            </span> 
            Blog
          </Link>
          <p className="text-sm mt-5">
            Welcome to my blog, where I share my thoughts and experiences on various topics.
            Register using email and password or Google.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex-1">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="email@gmail.com"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password Input */}
            <div className="mt-3">
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="*****"
                id="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-5 transition-all duration-300 ease-in-out"
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
              ) : 'Submit'}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to="/signup" className="text-blue-500">
              Sign up
            </Link>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <Alert className="mt-5 text-red-500 font-bold">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
