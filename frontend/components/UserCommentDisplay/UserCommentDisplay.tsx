import styles from './UserCommentDisplay.module.css';
import star from '@/public/assets/icons8-star-48.png';
import { doc, collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import circle_checked from '@/public/assets/radio_checked.png';
import circle_unchecked from '@/public/assets/radio_unchecked.png';
import { useState, useEffect} from 'react';
import { User } from 'next-auth';
import { clearInterval, clearTimeout, setInterval } from 'timers';
import { time } from 'console';

interface UserReviewProps{
    reviews: Array<UserReviewData>
}

interface UserReviewData{
    movieName: string,
    userReview: string,
    date: Timestamp,
    score: string,
    userReviewName: string
}

const UserCommentDisplay: React.FC<UserReviewProps> = ({reviews}) =>{
    const [displayedComment, setDisplayComment] = useState<UserReviewData>(reviews[0]);
    const [count, setCount] = useState(0);
    let numCount = 0;
    
    useEffect(() => {
        setDisplayComment(reviews[count]);
    }, [count]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(num => num === 4? num = 0: num + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    
    return (
        <div className={styles.container}>
            <div className={styles.firstSection}>
                <h1 className={styles.userName}> {displayedComment.userReviewName}</h1>
                <h2 className={styles.userDate}>{displayedComment.date ? displayedComment.date.toDate().toLocaleDateString() : 'Date not available'}</h2>
            </div>
            <div className={styles.secondSection}>
                <span className={styles.userRating}>{
                }
                </span>
            </div>
            <p className={styles.userComment}>{displayedComment.userReview}</p>
            <div className={styles.commentAutomate}>
                <span className={styles.circlesContainer}>
                    <img src={count === 0? circle_checked.src: circle_unchecked.src} className={styles.uncheckedCircle}></img>
                    <img src={count === 1? circle_checked.src: circle_unchecked.src} className={styles.uncheckedCircle}></img>
                    <img src={count === 2? circle_checked.src: circle_unchecked.src} className={styles.uncheckedCircle}></img>
                    <img src={count === 3? circle_checked.src: circle_unchecked.src} className={styles.uncheckedCircle}></img>
                    <img src={count === 4? circle_checked.src: circle_unchecked.src} className={styles.uncheckedCircle}></img>
                </span>
            </div>
        </div>
    );
};

export default UserCommentDisplay;