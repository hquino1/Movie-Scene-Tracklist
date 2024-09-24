import styles from './UserCommentDisplay.module.css';
import star from '@/public/assets/icons8-star-48.png'
const UserCommentDisplay = () =>{
    return (
        <div className={styles.container}>
            <div className={styles.firstSection}>
                <h1 className={styles.userName}>User Name</h1>
                <h2 className={styles.userDate}>29, August 2024</h2>
            </div>
            <div className={styles.secondSection}>
                <span className={styles.userRating}><img src={star.src} className={styles.starImg}></img></span>
            </div>
            <p className={styles.userComment}>A bunch of workds lfwljeofjowjefojwoejowjefddddddddddddddddddddddddddddddddddddddddd</p>
            <div className={styles.commentAutomate}></div>
        </div>
    );
};

export default UserCommentDisplay;