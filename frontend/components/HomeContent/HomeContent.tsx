import { useEffect, useState } from 'react';
import styles from './HomeContent.module.css';
import axios from 'axios';
import MovieCard from '../MovieCard/MovieCard';
import MovieList from '../MovieList/MovieList';

interface HomeContentProps{
    search: string,
    userInput: string
};

interface MovieData{
    results: Array<any>
}

const HomeContent: React.FC<HomeContentProps> = ({search, userInput}) => {
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const [movieData, setMovieData] = useState<MovieData | null>(null);

    useEffect(() => {
        const getMoviesInfo = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3${search === 'trending'? '/trending/all/week' : '/movie/top_rated'}?api_key=${API_KEY}&language=en-US&page=1`);
                console.log("Fetched data: ", response);
                setMovieData(response.data);
            } catch(error){
                console.log("Error getting movie data. ", error);
                return null;
            }

        };
        getMoviesInfo();
    }, [search, userInput]);


    return (
        <section className={styles.homeContentContainer}>
            {/* {movieData && (<MovieCard responseObject={movieData.results[0]}></MovieCard>)} */}
            <ul className={styles.movieCardHolder}>
                {movieData && movieData.results.map((movie, key) => (
                    <li key={key} className={styles.testContainer}><MovieCard responseObject={movie}></MovieCard></li>
                ))}
            </ul>
        </section>
    );
};

export default HomeContent;