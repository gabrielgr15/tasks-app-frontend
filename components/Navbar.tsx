import React from 'react';
import Link from 'next/link';

export default function Navbar(){
    return (
        <nav className='bg-gray-800 p-4 text-white flex justify-between items-center'>
            <h1 className='text-xl font-bold'>Task Manager</h1>

            <div className='flex space-x-4'>
                <Link href="/dashboard" className='hover:text-gray-300'>Dashboard</Link>
                <Link href="/login" className='hover:text-gray-300'>Login</Link>
                <Link href="/register" className='hover:text-gray-300'>Register</Link>
            </div>
        </nav>
    )
}