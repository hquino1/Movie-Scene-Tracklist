'use client'
import styles from './NavBar.module.css';
import logoImg from '../../public/assets/Screenshot 2024-08-06 164631.png';
import searchIcon from '../../public/assets/graySearch.png';
import { usePathname } from 'next/navigation';

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
                <li
                    className={styles.liContainer}
                    style={{
                        backgroundColor: pathname === '/home' ? '#0D93DD' : 'transparent',
                        color: pathname === '/home' ? 'white' : 'black'
                    }}
                    >
                    Home
                </li>
                <li className={styles.liContainer}>Liked Movies</li>
                <li className={styles.liContainer}>Settings</li>
            </ul>
        </header>
    );
};

export default NavBar;