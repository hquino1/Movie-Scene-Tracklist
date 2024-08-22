import styles from './UserRating.module.css';
import star from '@/public/assets/gradeStar.png';

interface RatingProps{
    giveRating: boolean;
    setGiveRating: React.Dispatch<React.SetStateAction<boolean>>;
};


const UserRating: React.FC<RatingProps> = ({giveRating, setGiveRating}) => {
    return (
        <div className={styles.backgroundContainer}>
            <h2 className={styles.movieTitle}>Deadpool & Wolverine</h2>
            <form className={styles.ratingForm}>
                <div className={styles.usernameInput}>
                    <label className={styles.usernameInputName}>Name:</label>
                    <input className={styles.usernameInputBox}></input>
                </div>
                <div className={styles.starRatingContainer}>
                    <ul className={styles.starsUl}>
                        <li><img src={star.src} className={styles.starImg}></img></li>
                        <img src={star.src} className={styles.starImg}></img>
                        <img src={star.src} className={styles.starImg}></img> 
                        <img src={star.src} className={styles.starImg}></img>
                        <img src={star.src} className={styles.starImg}></img>

                    </ul>
                </div>
                <div className={styles.textAreaContainer}><textarea className={styles.userCommentArea} placeholder='Share details of your experience for this movie'></textarea></div>
            </form>
            <div className={styles.ratingDecision}>
                <button className={styles.ratingButton} onClick={() => setGiveRating(false)}>Cancel</button>
                <button className={styles.ratingButton}>Submit</button>
            </div>
        </div>
    );
};

export default UserRating;