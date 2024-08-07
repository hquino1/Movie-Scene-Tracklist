'use client'
import styles from './NavBar.module.css';
import logoImg from '../../public/assets/Screenshot 2024-08-06 164631.png';
import searchIcon from '../../public/assets/graySearch.png';

const NavBar = () => {
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
        </header>
    );
};

export default NavBar;