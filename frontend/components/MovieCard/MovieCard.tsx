import styles from './MovieCard.module.css';
import Image from 'next/image';

interface MovieCardProps{
    responseObject: object
}

const MovieCard: React.FC<MovieCardProps> = ({responseObject}) => {
    console.log("RESPONSE OBJECT", responseObject);
    return (
        <div className={styles.movieCardContainer}>
            {/* <Image src={`https://image.tmdb.org/t/p/original/${responseObject.backdrop_path || responseObject.poster_path}`} alt={''}></Image> */}
        </div>
    );
};

export default MovieCard;