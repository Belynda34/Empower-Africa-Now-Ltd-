import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-900 text-gray-300 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} CRUD Posts App — Built with React & Redux Toolkit
        </p>
      </div>
    </footer>
  );
};

export default Footer;
