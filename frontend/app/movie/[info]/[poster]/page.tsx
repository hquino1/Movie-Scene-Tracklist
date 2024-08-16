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
            <div className="background" style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0) 70%, rgba(255,255,255,1)), url(https://image.tmdb.org/t/p/original${moviePoster})`, opacity: '0.85'}}>
                <div className="soundtrackInfo">
                    <div className="soundtrackTitle">{movieName}
                        
                    </div>

                </div>
            </div>

        </section>
    );
};

export default MovieInfo;