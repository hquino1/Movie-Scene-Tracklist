import { useState } from 'react';
import styles from './HomeNavBar.module.css';

interface HomeNavBarProps{
    searchQuery: (userSelection: string) => void;
}

const HomeNavBar: React.FC<HomeNavBarProps> = ({searchQuery}) => {
    const [category, setCategory] = useState('trending');

    const handleClick = (searchCategory: string) =>{
        setCategory(searchCategory);
        searchQuery(category);
    }

    return (
        <header className={styles.homeNavBarContainer}>
            <ul className={styles.ulHomeNav}>
                <li className={styles.liContainer} style={{backgroundColor: category === 'trending'? '#0D93DD' : 'transparent', color: category === 'trending'? 'white' : 'black'}} onClick={() => handleClick('trending')} onChange={(e) => setCategory('trending')}>Trending</li>
                <li className={styles.liContainer} style={{backgroundColor: category === 'topRated'? '#0D93DD' : 'transparent', color: category === 'topRated'? 'white' : 'black'}} onClick={() => handleClick('topRated')} onChange={(e) => setCategory('topRated')}>Top Rated</li>
            </ul>
        </header>
    );
};

export default HomeNavBar;