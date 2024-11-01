import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate("/"); // Navigate to the home page on successful login
    } catch (error) {
      setError("Invalid email or password. Please try again or register.");
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto max-w-6xl bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="md:w-1/2">
            <img
              className="object-cover w-full h-56 md:h-full"
              loading="lazy"
              src="https://img.freepik.com/free-vector/blog-post-concept-illustration_114360-28016.jpg?t=st=1730401799~exp=1730405399~hmac=937fb20169e375b7e501ac1d2099342dfa1e7e780927d54d4ecff376e3a50fa2&w=740"
              alt="Welcome back, you've been missed!"
            />
          </div>
          <div className="md:w-1/2 p-6 md:p-8 lg:p-10 flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
             
                <h4 className="mt-4 text-xl font-semibold">Welcome back, you've been missed!</h4>
              </div>
              {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Display error message */}
              <form onSubmit={handleSubmit} className="space-y-4">
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
                    Log in now
                  </button>
                </div>
              </form>
              <div className="text-center mt-8">
                <a href="/register" className="text-gray-500 hover:underline">Create new account</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
