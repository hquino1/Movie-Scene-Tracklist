import { useEffect } from 'react';
import styles from './HomeContent.module.css';
import axios from 'axios';
import MovieCard from '../MovieCard/MovieCard';


interface HomeContentProps{
    search: string,
    userInput: string
};

const HomeContent: React.FC<HomeContentProps> = ({search, userInput}) => {
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    let response = null;

    useEffect(() => {
        const getMoviesInfo = async () => {
            try {
                response = await axios.get(`https://api.themoviedb.org/3${search === 'trending'? '/trending/all/week' : '/movie/top_rated'}?api_key=${API_KEY}&language=en-US&page=1`);
                console.log("Fetched data: ", response);
            } catch(error){
                console.log("Error getting movie data. ", error);
            }
        };
        getMoviesInfo();
    }, [search, userInput]);


    return (
        <section className={styles.homeContentContainer}>
            <MovieCard responseObject={response.data.results[0]}></MovieCard>
        </section>
    );
};

export default HomeContent;