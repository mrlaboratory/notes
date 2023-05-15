import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
    return (
        <div className='bg-gray-100 min-h-screen'>
           <div className='w-full bg-white'>
           <div className='container mx-auto'>
                <Navbar></Navbar>
            </div>
           </div>
            <div className='container mx-auto mt-10'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default MainLayout;