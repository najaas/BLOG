import React, { useEffect, useState, useContext } from "react";
import API from "../Api";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CommentForm from "./CommentForm";
import BlogForm from "./BlogForm";
import Swal from "sweetalert2"; // Import SweetAlert2

const BlogDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false); 
  const [enable, setEnable] = useState(false); 
  const [former, setFormer] = useState(false);

  const navigate = useNavigate();

  async function deletepost() {
    // Show SweetAlert confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });


    if (result.isConfirmed) {
      try {
        const response = await API.delete(`/blog/${id}`);
      
        Swal.fire(
          'Deleted!',
          'Your post has been deleted.',
          'success'
        );
        navigate("/")
      } catch (error) {
        console.error("Error deleting post:", error);
        Swal.fire(
          'Error!',
          'There was an issue deleting your post.',
          'error'
        );
      }
    }
  }

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await API.get(`/blog/${id}`);
        
        if (data && data.blog) {
          setBlog(data.blog);
          setEnable(data.verification); 
          
          console.log("Verification value:", data.verification);
          
          const commentsResponse = await API.get(`/comment/${id}`);
          setComments(commentsResponse.data || []);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error(error); 
        navigate("/login");
      }
    };

    fetchBlog();
  }, [id, navigate]);

  const addComment = (newComment) => setComments((prevComments) => [...prevComments, newComment]);

  return blog ? (
    <div className="container mx-auto p-4">
      <div className="p-6 bg-white rounded-lg shadow-lg mb-4">
        <h2 className="text-2xl font-bold">{blog.title}</h2>
        <p className="mt-4 text-gray-700">{blog.content}</p>
      </div>
      
      {enable && (
        <div className="flex w-full justify-end gap-10 mb-4">
          <button onClick={() => setFormer(true)} 
            style={{
              backgroundColor: "green",
              color: "white",
              border: "2px solid black",
              borderRadius: "5px",
              width: "100px"
            }}
          >
            Edit your post
          </button>
          <button  
            style={{
              backgroundColor: "red",
              color: "white",
              border: "2px solid black",
              borderRadius: "5px",
              width: "100px"
            }}
            onClick={deletepost}
          >
            Delete your post
          </button>
          <p>Enable value: {enable.toString()}</p>
        </div>
      )}

      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      {comments.map((comment) => (
        <div key={comment._id} className="p-4 mb-4 bg-gray-100 rounded-lg flex gap-5">
          <p>{comment.content}</p>
          <p style={{ color: "Green", fontWeight: "bolder" }}>
            {comment.userId ? comment.userId.username : "you"}
          </p>
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
      
      {former && (
        <BlogForm blog={blog} onClose={() => setFormer(false)} />
      )}
    </div>
  ) : (
    <p className="text-center mt-4">Loading...</p>
  );
};

export default BlogDetail
