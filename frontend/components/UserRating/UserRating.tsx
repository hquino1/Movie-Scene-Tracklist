import { ButtonHTMLAttributes, useEffect, useState } from 'react';
import styles from './UserRating.module.css';
import star from '@/public/assets/gradeStar.png';
import starYellow from '@/public/assets/gradeStarYellow.png';
import { db } from '../../app/firebase/config'; 
import { addDoc, collection } from 'firebase/firestore';

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
    const [userReview, setUserReview] = useState("");
    const [userReviewName, setUserReviewName] = useState("");
    const [score, setScore] = useState(0);

    useEffect(() => {
        console.log("SCORE UPDATE: ", score);
    }, [score]);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try{
            await addDoc(collection(db, "reviews"), {
                movieName,
                date: new Date(),
                userReviewName,
                score,
                userReview
            });
            setUserReview("");
            setScore(0);
            setUserReviewName("");
            console.log("SUCCESSFUL RATING ENTRY");
        } catch (error){
            console.log("Error processing user rating.", error);
        };
    };

    return (
        <div className={styles.backgroundContainer}>
            <h2 className={styles.movieTitle}>{movieName}</h2>
            <form className={styles.ratingForm} onSubmit={handleSubmit}>
                <div className={styles.usernameInput}>
                    <label className={styles.usernameInputName}>Name:</label>
                    <input className={styles.usernameInputBox} value={userReviewName} onChange={(e) => setUserReviewName(e.target.value)}></input>
                </div>
                <div className={styles.starRatingContainer}>
                    <ul className={styles.starsUl}>
                        {(!starColor1 && !starColor2 && !starColor3 && !starColor4 && !starColor5) && <img src={star.src} className={styles.starImg} onClick={() => {setStarColor1(true); setScore(1)}}></img>}
                        {(starColor1 || starColor2 || starColor3 || starColor4 || starColor5) && <img src={starYellow.src} className={styles.starImg} onClick={() => setStarColor1(false)}></img>}

                        {(!starColor2 && !starColor3 && !starColor4 && !starColor5) && <img src={star.src} className={styles.starImg} onClick={() => {setStarColor2(true); setScore(2)}}></img>}
                        {(starColor2 || starColor3 || starColor4 || starColor5) && <img src={starYellow.src} className={styles.starImg} onClick={() => setStarColor2(false)}></img>}

                        {(!starColor3 && !starColor4 && !starColor5) && <img src={star.src} className={styles.starImg} onClick={() => {setStarColor3(true); setScore(3)}}></img>}
                        {(starColor3 || starColor4 || starColor5) && <img src={starYellow.src} className={styles.starImg} onClick={() => setStarColor3(false)}></img>}

                        {(!starColor4 && !starColor5) && <img src={star.src} className={styles.starImg} onClick={() => {setStarColor4(true); setScore(4)}}></img>}
                        {(starColor4 || starColor5) && <img src={starYellow.src} className={styles.starImg} onClick={() => setStarColor4(false)}></img>}

                        {(!starColor5) && <img src={star.src} className={styles.starImg} onClick={() => {setStarColor5(true); setScore(5)}}></img>}
                        {(starColor5) && <img src={starYellow.src} className={styles.starImg} onClick={() => {setStarColor5(false)}}></img>}
                    </ul>
                </div>
                <div className={styles.textAreaContainer}><textarea className={styles.userCommentArea} placeholder='Share details of your experience for this movie' value={userReview} onChange={(e) => setUserReview(e.target.value)}></textarea></div>
                <div className={styles.ratingDecision}>
                    <button className={styles.ratingButton} onClick={() => setGiveRating(false)}>Cancel</button>
                    <button className={styles.ratingButton} type='submit'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default UserRating;