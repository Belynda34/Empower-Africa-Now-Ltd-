import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-green-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          CRUD Posts
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 text-sm font-medium">
          {/* <li><Link to="/" className="hover:underline">Home</Link></li> */}
          <li><Link to="/posts/new" className="hover:underline">Create</Link></li>
        </ul>

        {/* Mobile Menu Icon */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-green-500 px-4 pb-4">
          <ul className="flex flex-col gap-3 text-sm">
            {/* <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li> */}
            <li><Link to="/create" onClick={() => setOpen(false)}>Create</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
