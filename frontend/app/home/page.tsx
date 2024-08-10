'use client';
import { useState } from 'react';
import './pages.modules.css';
import NavBar from '@/components/NavBar/NavBar';
import {useAuth} from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

const Home = () => {
    const [page, setPage] = useState('Home');
    const { user, loading } = useAuth();
    const router = useRouter();

    if (!loading && !user){
        console.log("User is not defined.");
        router.push('/sign-in');
    } else if(!loading && user){
        console.log("user: ", user);
    }

    return (
        <section className="homeContainer">
           <NavBar></NavBar> 
        </section>
    );
}; 

export default Home;