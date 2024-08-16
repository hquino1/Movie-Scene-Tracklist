'use client'
import { usePathname, useSearchParams } from "next/navigation";
import './pages.modules.css';
import Image from 'next/image';
import NavBar from "@/components/NavBar/NavBar";
import { useEffect, useState } from "react";

const MovieInfo = () => {
    const [userInput, setUserInput] = useState('');
    const [songs, setSongs] = useState<Song[]>([]);
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


    async function getAccessToken() {
       const clientID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
       const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
       
       const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(clientID + ':' + clientSecret).toString('base64'),
            },
            body: 'grant_type=client_credentials',
        });

        const tokenData = await tokenResponse.json();
        return tokenData.access_token;
    }

    async function fetchAlbumData(movieName: string) {
        const accessToken = await getAccessToken();
        
        // Example: Search for album data related to the movie
        const searchQuery = encodeURIComponent(movieName);
        const apiUrl = `https://api.spotify.com/v1/search?q=${searchQuery}&type=album`;

        const response = await fetch(apiUrl, {
            headers: {
            'Authorization': `Bearer ${accessToken}`,
            },
        });

        const albumData = await response.json();
        console.log(albumData);
        let test = albumData.albums.items[0].href;
        
        await fetch(test, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        })
        .then(response => response.json())
        .then(data => setSongs(data.tracks.items));
        console.log("SONGS:",songs);
    }

    useEffect(() => {
        fetchAlbumData(movieName);
    }, [movieName]);

    useEffect(() => {
        console.log("Updated songs state:", songs);
    }, [songs]);


    interface Song{
        name: string,
        track_number: string,
    }

    return (
        <section className="movieInfoContainer" >
            <NavBar getUserInput={getUserInput}></NavBar>
            <div className="background" style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0) 70%, rgba(255,255,255,1)), url(https://image.tmdb.org/t/p/original${moviePoster})`, opacity: '0.85'}}>
                <div className="soundtrackInfo">
                    <div className="soundtrackTitle">{movieName}</div>
                    <ul className="soundtrackSongs">
                        {songs && songs.map((song, key) => (
                            <li key={key} className="song">{song.track_number}. {song.name}</li>
                        ))}
                    </ul>

                </div>
            </div>

        </section>
    );
};

export default MovieInfo;