import style from './Attribution.module.css';
import tmdbLogo from '../../public/assets/tmdb.svg';

const Attribution = () =>{
    return (
        <footer className={style.attributionContainer}>
            Powered by 
            <img src={tmdbLogo.src} className={style.tmdbLogo}></img>
        </footer>
    );
};

export default Attribution;