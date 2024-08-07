'use client'
import styles from './NavBar.module.css';
import logoImg from '../../public/assets/Screenshot 2024-08-06 164631.png';

const NavBar = () => {
    return (
        <header className={styles.container}>
            <div className={styles.logo}>
                <img src={logoImg.src} className={styles.logoImage}></img>
            </div>
            <input className={styles.search}></input>
        </header>
    );
};

export default NavBar;