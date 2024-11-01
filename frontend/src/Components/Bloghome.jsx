import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CombinedBlogLanding = ({ onLogout = () => {}, onNavigate = () => {} }) => {
  const [showBlogList, setShowBlogList] = useState(false); // Initialize the state
  const [blogs, setBlogs] = useState([
    {
      _id: 1,
      title: "First Blog Post",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
      _id: 2,
      title: "Second Blog Post",
      content: "Sed do eiusmod tempor incididunt ut labore et dolore."
    },
    {
      _id: 3,
      title: "Third Blog Post",
      content: "Ut enim ad minim veniam, quis nostrud exercitation."
    }
  ]);

  const handleCreateClick = () => {
    onNavigate('/create');
  };

  const handleBlogClick = (blogId) => {
    onNavigate(`/blog/${blogId}`);
  };

  const Landing = () => (
    <div className="min-h-screen bg-white">
      <section className="relative h-[500px]">
        <div className="absolute inset-0">
          <img
            src="/api/placeholder/1920/500"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
            Learn From Writing Pro
          </h1>
          <p className="text-xl text-center max-w-2xl mb-8">
            Share your knowledge and experiences with our growing community
          </p>
          <Link to="/">
            <button
              className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            > 
              View Blog Posts
            </button>
          </Link>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">About us</h2>
          <p className="text-gray-600">
            We are a community of writers and learners dedicated to sharing knowledge
            and experiences. Join us to improve your writing skills and connect with
            like-minded individuals from around the world.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.slice(0, 3).map((blog) => (
              <div 
                key={blog._id} 
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleBlogClick(blog._id)}
              >
                <img
                  src="/api/placeholder/400/300"
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                  <p className="text-gray-600">{blog.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-600">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Contact us</h2>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 rounded-md"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 rounded-md"
              />
            </div>
            <div>
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full px-4 py-2 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white text-blue-600 font-semibold py-2 px-6 rounded-md hover:bg-gray-100 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><button onClick={() => setShowBlogList(false)} className="hover:text-white">Home</button></li>
              <li><button onClick={() => setShowBlogList(true)} className="hover:text-white">Blog</button></li>
              <li><button className="hover:text-white">About</button></li>
              <li><button className="hover:text-white">Contact</button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li><button className="hover:text-white">Writing Tips</button></li>
              <li><button className="hover:text-white">Community</button></li>
              <li><button className="hover:text-white">Resources</button></li>
              <li><button className="hover:text-white">Support</button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Member Area</h3>
            <ul className="space-y-2">
              <li><button className="hover:text-white">Sign In</button></li>
              <li><button className="hover:text-white">Register</button></li>
              <li><button className="hover:text-white">Dashboard</button></li>
              <li><button className="hover:text-white">Settings</button></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );

  return showBlogList ? <BlogList /> : <Landing />;
};

export default CombinedBlogLanding;
