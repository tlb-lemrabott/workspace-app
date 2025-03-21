import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
        <Link to="/">Lemrabott Toulba</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/accounts" className="hover:bg-blue-500 px-3 py-2 rounded">Accounts</Link>
            </li>
            <li>
              <Link to="/notes" className="hover:bg-blue-500 px-3 py-2 rounded">Notes</Link>
            </li>
            <li>
              <Link to="/users" className="hover:bg-blue-500 px-3 py-2 rounded">Users</Link>
            </li>
            <li>
              <Link to="/events" className="hover:bg-blue-500 px-3 py-2 rounded">Events</Link>
            </li>
            <li>
              <Link to="/tocall" className="hover:bg-blue-500 px-3 py-2 rounded">ToCall</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;