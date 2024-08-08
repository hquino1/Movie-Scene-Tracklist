'use client'
import styles from './NavBar.module.css';
import logoImg from '../../public/assets/Screenshot 2024-08-06 164631.png';
import searchIcon from '../../public/assets/graySearch.png';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const NavBar = () => {
    const pathname = usePathname();


    return (
        <header className={styles.container}>
            <div className={styles.logo}>
                <img src={logoImg.src} className={styles.logoImage}></img>
            </div>
            <div className={styles.searchContainer}>
                <input className={styles.search} placeholder='Search movies'></input>
                <div className={styles.searchLogoContainer}>
                    <img className={styles.searchLogo} src={searchIcon.src}></img>
                </div>
            </div>
            <ul className={styles.ulContainer}>
                <Link href={'/home'} className={styles.linkContainer}>
                    <li
                        className={styles.liContainer}
                        style={{
                            backgroundColor: pathname === '/home' ? '#0D93DD' : 'transparent',
                            color: pathname === '/home' ? 'white' : 'black'
                        }}
                        >
                        Home
                    </li>
                </Link>

                <Link href={'/likedMovies'} className={styles.linkContainer}>
                    <li
                    className={styles.liContainer}
                    style={{
                        backgroundColor: pathname === '/likedMovies' ? '#0D93DD' : 'transparent',
                        color: pathname === '/likedMovies' ? 'white' : 'black'
                    }}
                    >
                    Liked Movies
                    </li>
                </Link>

                <Link href={'/settings'} className={styles.linkContainer}>
                    <li
                    className={styles.liContainer}
                    style={{
                        backgroundColor: pathname === '/settings' ? '#0D93DD' : 'transparent',
                        color: pathname === '/settings' ? 'white' : 'black'
                    
                    }}
                    >
                    Settings
                    </li>
                </Link>
            </ul>
        </header>
    );
};

export default NavBar;