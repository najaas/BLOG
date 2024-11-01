import React, { useState } from "react";
import API from "../Api"; // Make sure the API module is set up correctly
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", formData);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto max-w-6xl bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img
              className="object-cover w-full h-56 md:h-full"
              loading="lazy"
              src="https://img.freepik.com/free-vector/organic-flat-blog-post-illustration-with-people_23-2148955260.jpg?t=st=1730402346~exp=1730405946~hmac=bec55e014cb5736169b0e1a2e23f26aeba3c3c498d526a8fe2524017e0c14974&w=740"
              alt="Welcome, please register!"
            />
          </div>
          <div className="md:w-1/2 p-6 md:p-8 lg:p-10 flex items-center justify-center">
            <div className="w-full max-w-md">
              <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
              {error && <p className="text-red-500 text-center mb-4">{error}</p>}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="username" className="sr-only">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    required
                    className="form-input w-full p-3 border rounded-lg border-gray-300 placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-200"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    onChange={handleChange}
                    required
                    className="form-input w-full p-3 border rounded-lg border-gray-300 placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-200"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    className="form-input w-full p-3 border rounded-lg border-gray-300 placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-200"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-200"
                  >
                    Register
                  </button>
                </div>
              </form>
              <div className="text-center mt-8">
                <a href="/login" className="text-gray-500 hover:underline">Already have an account? Log in</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
