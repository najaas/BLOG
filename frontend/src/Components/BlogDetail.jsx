import React, { useEffect, useState, useContext } from "react";
import API from "../Api";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CommentForm from "./CommentForm";

const BlogDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false); // State for toggling CommentForm

  useEffect(() => {
    const fetchBlog = async () => {
      const { data } = await API.get(`/blog/${id}`);
      setBlog(data);
      const commentsget = async()=>{
const comment =await API.get("/comment/:"+id)
console.log(comment)
      }
      
      setComments(data.comments || []);
    };
    fetchBlog();
  }, [id]);

  const addComment = (newComment) => setComments([...comments, newComment]);

  return blog ? (
    <div className="container mx-auto p-4">
      <div className="p-6 bg-white rounded-lg shadow-lg mb-4">
        <h2 className="text-2xl font-bold">{blog.title}</h2>
        <p className="mt-4 text-gray-700">{blog.content}</p>
      </div>
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      {comments.map((comment) => (
        <div key={comment._id} className="p-4 mb-4 bg-gray-100 rounded-lg">
          <p>{comment.content}</p>
        </div>
      ))}

      {user && (
        <button 
          onClick={() => setShowCommentForm((prev) => !prev)} 
          className="italic text-red-500"
          style={{ fontSize: "15px" }}
        >
          Add your comment here
        </button>
      )}

      {showCommentForm && user && (
        <CommentForm 
          blogId={id} 
          addComment={addComment} 
          onClose={() => setShowCommentForm(false)} 
        />
      )}
    </div>
  ) : (
    <p className="text-center mt-4">Loading...</p>
  );
};

export default BlogDetail;
