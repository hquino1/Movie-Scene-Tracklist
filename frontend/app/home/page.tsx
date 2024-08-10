'use client';
import { useState } from 'react';
import './pages.modules.css';
import NavBar from '@/components/NavBar/NavBar';
import HomeNavBar from '@/components/HomeNavBar/HomeNavBar';
import {useAuth} from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

const Home = () => {
    const [page, setPage] = useState('Home');
    const [search, setSearch] = useState('trending');
    const { user, loading } = useAuth();
    const router = useRouter();

    const searchQuery = (userSelection: string) =>{
        setSearch(userSelection);
        console.log(search);
    }

    if (!loading && !user){
        console.log("User is not defined.");
        router.push('/sign-in');
    } else if(!loading && user){
        console.log("user: ", user);
    }

    return (
        <section className="homeContainer">
           <NavBar></NavBar> 
           <HomeNavBar searchQuery={searchQuery}></HomeNavBar>
        </section>
    );
}; 

export default Home;