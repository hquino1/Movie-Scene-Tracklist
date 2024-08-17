import { useState } from 'react';
import styles from './MovieCard.module.css';
import Image from 'next/image';
import loading from '../../public/assets/Rolling.gif';
import Link from 'next/link';

interface MovieData{
    backdrop_path : string,
    poster_path: string,
    original_title: string,
    original_name: string,
    media_type: string,
    release_date: string,
    overview: string
}


interface MovieCardProps{
    responseObject: MovieData
}


const MovieCard: React.FC<MovieCardProps> = ({responseObject}) => {
    const movieName = encodeURIComponent(responseObject.original_name || responseObject.original_title);
    const moviePoster = encodeURIComponent(responseObject.backdrop_path || responseObject.backdrop_path);
    const [isLoading, setIsLoading] = useState(true);
    const date = responseObject.release_date?.split('-').filter(Boolean);
    if (date){
        console.log("DATE: ", date[0]);
    }

    if(responseObject.media_type === "tv"){
        return null
    }

    const handleImageLoad = () =>{
        setIsLoading(false);
    };

    return (
        <Link href={`/movie/${movieName}/${moviePoster}`}>
            <div className={styles.movieCardContainer}>
                {isLoading && (<Image src={loading.src} width={50} height={50} className={styles.loadingScreen} alt=''></Image>)}
                <Image src={`https://image.tmdb.org/t/p/original/${responseObject.poster_path || responseObject.backdrop_path}`} alt={""} width={170} height={250} className={styles.movieImage} onLoad={handleImageLoad} onError={() => setIsLoading(true)}></Image>
                {!isLoading && <h1 className={styles.textStyle}>{responseObject.original_title || responseObject.original_name}</h1>}
                {!isLoading && <h2 className={styles.textStyle2}>{date[0]}</h2>}
            </div>
        </Link>
    );
};

export default MovieCard;
