'use client'
import { usePathname, useSearchParams } from "next/navigation";
import './pages.modules.css';
import Image from 'next/image';
import NavBar from "@/components/NavBar/NavBar";
import { useEffect, useState } from "react";
import spotifyLogo from '../../../../../public/assets/icons8-spotify-logo-24.png';

const MovieInfo = () => {
    const [userInput, setUserInput] = useState('');
    const [songs, setSongs] = useState<Song[]>([]);
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);
    const [albumName, setAlbumName] = useState('');
    let movieName = '';
    let moviePoster = '';
    let movieDate = '';

    if (segments.length >= 3) {
        // The last two segments are the movie name and poster path
        movieName = decodeURIComponent(segments[segments.length - 3]);
        moviePoster = decodeURIComponent(segments[segments.length - 2]);
        movieDate = decodeURIComponent(segments[segments.length - 1]);
        //const yearDate = movieDate?.split('-').filter(Boolean);
        //movieDate = yearDate[0];
        movieDate = splitDate(movieDate);
        console.log("MOVIE DATE: ", movieDate);
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
        const apiUrl = `https://api.spotify.com/v1/search?q=${searchQuery}&type=album&genre=soundtrack&year=${movieDate}`;

        const response = await fetch(apiUrl, {
            headers: {
            'Authorization': `Bearer ${accessToken}`,
            },
        });

        const albumData = await response.json();
        console.log(albumData);
        const choices = albumData.albums.items;
        //console.log("CHOICES: ", choices);
        let test = albumData.albums.items[0].href;
        if (albumData){
            let mainChoice = choices[0];
            for(let i = 1; i < choices.length; i++){
                const year = splitDate(choices[i].release_date);
                const mainYear = splitDate(mainChoice.release_date);
                const nextSizeOfSoundtrack = choices[i].total_tracks;
                const currentSizeOfSoundtrack = mainChoice.total_tracks;
                if((year === movieDate && mainYear !== movieDate && nextSizeOfSoundtrack > 5) || (year === mainYear && nextSizeOfSoundtrack > currentSizeOfSoundtrack)){
                    //console.log("NEW CHOICE: ", choices[i].name, " DATE: ", year);
                    mainChoice = choices[i];
                    test = choices[i].href;
                    setAlbumName(choices[i].name);
                }
            }
        }
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

    function splitDate(date: string){
        const year = date?.split('-').filter(Boolean);
        return year[0];
    };

    interface Song{
        name: string,
        track_number: string,
    }

    return (
        <section className="movieInfoContainer" >
            <NavBar getUserInput={getUserInput}></NavBar>
            <div className="background" style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0) 70%, rgba(255,255,255,1)), url(https://image.tmdb.org/t/p/original${moviePoster})`, opacity: '0.85'}}>
                <footer className="warning">* Please note that our service can make mistakes. All info is provided by spotify. <br></br>
                <a target="_blank" href="https://icons8.com/icon/87050/spotify">Spotify logo</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
                </footer>
                <div className="soundtrackInfo">
                    <div className="soundtrackTitle">{movieName}
                        <img src={spotifyLogo.src} className="spotifyLogo"></img>
                    </div>
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