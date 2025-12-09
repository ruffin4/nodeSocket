import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
    return (
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <nav className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📝</span>
              <h1 className="text-xl font-bold text-gray-800">Todo App</h1>
            </div>

            <ul className="flex items-center space-x-6">
              <li>
                <Link
                  to="/"
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 rounded-md hover:bg-blue-50"
                >
                  🏠 Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/todos"
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 rounded-md hover:bg-blue-50"
                >
                  📋 Todos
                </Link>
              </li>

              <li>
                <Link
                  to="/zustandPage"
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 rounded-md hover:bg-blue-50"
                >
                  Zustande page
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
};

export default Header;