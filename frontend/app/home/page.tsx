'use client';
import { useState } from 'react';
import './pages.modules.css';
import NavBar from '@/components/NavBar/NavBar';

const Home = () => {
    const [page, setPage] = useState('Home');

    return (
        <section className="homeContainer">
           <NavBar></NavBar> 
        </section>
    );
}; 

export default Home;