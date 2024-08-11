'use client';
import { useState } from 'react';
import './pages.modules.css';
import NavBar from '@/components/NavBar/NavBar';
import HomeNavBar from '@/components/HomeNavBar/HomeNavBar';
import Attribution from '@/components/Attribution/Attribution';
import HomeContent from '@/components/HomeContent/HomeContent';
import {useAuth} from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

const Home = () => {
    const [page, setPage] = useState('Home');
    const [search, setSearch] = useState('trending');
    const [userInput, setUserInput] = useState('');
    const { user, loading } = useAuth();
    const router = useRouter();

    const searchQuery = (userSelection: string) =>{
        setSearch(userSelection);
        console.log(search);
    }

    const getUserInput = (searchBarInput: string) => {
        setUserInput(searchBarInput);
        console.log(userInput);
    };

    if (!loading && !user){
        console.log("User is not defined.");
        router.push('/sign-in');
    } else if(!loading && user){
        console.log("user: ", user);
    }

    return (
        <section className="homeContainer">
           <NavBar getUserInput={getUserInput}></NavBar> 
           <HomeNavBar searchQuery={searchQuery}></HomeNavBar>
           <HomeContent></HomeContent>
           <Attribution></Attribution>
        </section>
    );
}; 

export default Home;