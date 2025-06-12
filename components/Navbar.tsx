'use client';

import Link from 'next/link';
import { useAuth } from '@/context/Authcontext';


const AuthenticatedNav = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <button
      onClick={onLogout}
      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Logout
    </button>
  );
};


const GuestNav = () => {
  return (
    <>
      <Link href="/login">
        <span className="text-white hover:text-gray-300 mr-4">Login</span>
      </Link>
      <Link href="/register">
        <span className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Register
        </span>
      </Link>
    </>
  );
};


export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <Link href="/">
        <div className="text-2xl font-bold cursor-pointer">Task Manager</div>
      </Link>
      
      <div>
        {isAuthenticated ? <AuthenticatedNav onLogout={logout} /> : <GuestNav />}
      </div>
    </nav>
  );
}