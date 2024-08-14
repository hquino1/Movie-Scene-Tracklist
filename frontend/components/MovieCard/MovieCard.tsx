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
    const basicInfo = {
        movieName: responseObject.original_name,
        moviePoster: responseObject.poster_path,
    };
    const [isLoading, setIsLoading] = useState(true);
    // console.log("RESPONSE OBJECT", responseObject);
    if(responseObject.media_type === "tv"){
        return null
    }

    const handleImageLoad = () =>{
        setIsLoading(false);
    };

    return (
        <Link href={`/movie/${encodeURI(JSON.stringify(responseObject.original_title))}`}>
            <div className={styles.movieCardContainer}>
                {isLoading && (<Image src={loading.src} width={50} height={50} className={styles.loadingScreen} alt=''></Image>)}
                <Image src={`https://image.tmdb.org/t/p/original/${responseObject.poster_path || responseObject.backdrop_path}`} alt={""} width={170} height={250} className={styles.movieImage} onLoad={handleImageLoad} onError={() => setIsLoading(true)}></Image>
                {!isLoading && <h1 className={styles.textStyle}>{responseObject.original_title || responseObject.original_name}</h1>}
                {!isLoading && <h2 className={styles.textStyle2}>{responseObject.release_date}</h2>}
            </div>
        </Link>
    );
};

export default MovieCard;
