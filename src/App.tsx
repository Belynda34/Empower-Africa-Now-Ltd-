import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import PostsList from "./components/PostsList";
import PostDetails from "./components/PostDetails";
import PostForm from "./components/PostForm";
import Header from "./components/Header";
import Footer from "./components/Footer"; // optional

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<PostsList />} />
          <Route path="/posts/create" element={<PostForm />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/posts/:id/edit" element={<PostForm editMode />} />
        </Routes>
      </main>
      <Footer/>
    </div>
  );
};

export default App;
