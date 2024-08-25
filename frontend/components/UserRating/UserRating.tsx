import { useState } from 'react';
import styles from './UserRating.module.css';
import star from '@/public/assets/gradeStar.png';
import starYellow from '@/public/assets/gradeStarYellow.png';

interface RatingProps{
    giveRating: boolean;
    setGiveRating: React.Dispatch<React.SetStateAction<boolean>>;
    movieName: string;
};


const UserRating: React.FC<RatingProps> = ({giveRating, setGiveRating, movieName}) => {
    const [starColor1, setStarColor1] = useState(false);
    const [starColor2, setStarColor2] = useState(false);
    const [starColor3, setStarColor3] = useState(false);
    const [starColor4, setStarColor4] = useState(false);
    const [starColor5, setStarColor5] = useState(false);
    const [score, setScore] = useState(0);

    return (
        <div className={styles.backgroundContainer}>
            <h2 className={styles.movieTitle}>{movieName}</h2>
            <form className={styles.ratingForm}>
                <div className={styles.usernameInput}>
                    <label className={styles.usernameInputName}>Name:</label>
                    <input className={styles.usernameInputBox}></input>
                </div>
                <div className={styles.starRatingContainer}>
                    <ul className={styles.starsUl}>
                        {(!starColor1 && !starColor2 && !starColor3 && !starColor4 && !starColor5) && <img src={star.src} className={styles.starImg} onClick={() => setStarColor1(true)}></img>}
                        {(starColor1 || starColor2 || starColor3 || starColor4 || starColor5) && <img src={starYellow.src} className={styles.starImg} onClick={() => setStarColor1(false)}></img>}

                        {(!starColor2 && !starColor3 && !starColor4 && !starColor5) && <img src={star.src} className={styles.starImg} onClick={() => setStarColor2(true)}></img>}
                        {(starColor2 || starColor3 || starColor4 || starColor5) && <img src={starYellow.src} className={styles.starImg} onClick={() => setStarColor2(false)}></img>}

                        {(!starColor3 && !starColor4 && !starColor5) && <img src={star.src} className={styles.starImg} onClick={() => setStarColor3(true)}></img>}
                        {(starColor3 || starColor4 || starColor5) && <img src={starYellow.src} className={styles.starImg} onClick={() => setStarColor3(false)}></img>}

                        {(!starColor4 && !starColor5) && <img src={star.src} className={styles.starImg} onClick={() => setStarColor4(true)}></img>}
                        {(starColor4 || starColor5) && <img src={starYellow.src} className={styles.starImg} onClick={() => setStarColor4(false)}></img>}

                        {(!starColor5) && <img src={star.src} className={styles.starImg} onClick={() => setStarColor5(true)}></img>}
                        {(starColor5) && <img src={starYellow.src} className={styles.starImg} onClick={() => setStarColor5(false)}></img>}
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