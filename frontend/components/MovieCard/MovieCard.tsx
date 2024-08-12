import { useState } from 'react';
import styles from './MovieCard.module.css';
import Image from 'next/image';


interface MovieData{
    backdrop_path : string,
    poster_path: string,
    original_title: string,
    original_name: string,
    media_type: string,
    release_date: string
}

interface MovieCardProps{
    responseObject: MovieData
}


const MovieCard: React.FC<MovieCardProps> = ({responseObject}) => {
    console.log("RESPONSE OBJECT", responseObject);
    if(responseObject.media_type === "tv"){
        return null
    }
    return (
        <div className={styles.movieCardContainer}>
            <Image src={`https://image.tmdb.org/t/p/original/${responseObject.poster_path || responseObject.backdrop_path}`} alt={''} width={170} height={250} className={styles.movieImage}></Image>
            <h1 className={styles.textStyle}>{responseObject.original_title || responseObject.original_name}</h1>
            <h2 className={styles.textStyle2}>{responseObject.release_date}</h2>
        </div>
    );
};

export default MovieCard;