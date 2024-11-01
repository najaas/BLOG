import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import BlogList from "./Components/BlogList";
import BlogDetail from "./Components/BlogDetail";
import BlogForm from "./Components/BlogForm";
import AuthProvider from "./context/AuthContext";
import Home from "./Components/Bloghome"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/create" element={<BlogForm />} />
          <Route path="/edit/:id" element={<BlogForm />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
