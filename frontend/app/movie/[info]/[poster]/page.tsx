'use client'
import { usePathname, useSearchParams } from "next/navigation";
import './pages.modules.css';
import Image from 'next/image';
import NavBar from "@/components/NavBar/NavBar";
import { useState } from "react";

const MovieInfo = () => {
    const [userInput, setUserInput] = useState('');
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);
    
    let movieName = '';
    let moviePoster = '';

    if (segments.length >= 3) {
        // The last two segments are the movie name and poster path
        movieName = decodeURIComponent(segments[segments.length - 2]);
        moviePoster = decodeURIComponent(segments[segments.length - 1]);
    }

    const getUserInput = (searchBarInput: string) => {
        setUserInput(searchBarInput);
    };

    console.log("MOVIE NAME: ", movieName);
    console.log("POSTER: ", moviePoster);
    return (
        <section className="movieInfoContainer" >
            <NavBar getUserInput={getUserInput}></NavBar>
            {/* <header className="movieInfoHeader">
                {movieName}
            </header> */}
            <Image 
                src={`https://image.tmdb.org/t/p/original${moviePoster}`} 
                alt={movieName} 
                width={600}
                height={350}
                className="backdropImage"
            >
            </Image>

        </section>
    );
};

export default MovieInfo;