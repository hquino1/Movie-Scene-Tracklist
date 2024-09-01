import styles from './MovieRating.module.css';
import { db } from '@/app/firebase/config';
import { doc, collection, getDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import personIcon from '@/public/assets/bPersonIcon.png';
import star from '@/public/assets/icons8-star-48.png';

const MovieRating = () =>{

    useEffect(() => {
        const getUserReviewData = async() =>{
            const docRef = doc(db, "reviews", "Deadpool & Wolverine");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("DOCUMENT DATA: ", docSnap.data());
            } else {
                console.log("NO DATA FOUND");
            }
        };
        getUserReviewData();
    });

    return (
        <div className={styles.movieRatingContainer}>
            <div className={styles.allRatings}>
                <div className={styles.componentRating}>
                    <span>
                        <img src={star.src} className={styles.star}></img>
                        <img src={star.src} className={styles.star}></img>
                        <img src={star.src} className={styles.star}></img>
                        <img src={star.src} className={styles.star}></img>
                        <img src={star.src} className={styles.star}></img>
                    </span>
                    <img src={personIcon.src} className={styles.personIcon}></img>
                    <div className={styles.barOutline}><div style={{position: 'relative', height: '100%', width: '50%', backgroundColor: 'black'}}></div></div>
                </div>
                <div className={styles.componentRating}>
                    <span>
                        <img src={star.src} className={styles.star}></img>
                        <img src={star.src} className={styles.star}></img>
                        <img src={star.src} className={styles.star}></img>
                        <img src={star.src} className={styles.star}></img>
                    </span>
                    <img src={personIcon.src} className={styles.personIcon}></img>
                    <div className={styles.barOutline}><div style={{position: 'relative', height: '100%', width: '50%', backgroundColor: 'black'}}></div></div>
                </div>
                <div className={styles.componentRating}>
                    <span>
                        <img src={star.src} className={styles.star}></img>
                        <img src={star.src} className={styles.star}></img>
                        <img src={star.src} className={styles.star}></img>
                    </span>
                    <img src={personIcon.src} className={styles.personIcon}></img>
                    <div className={styles.barOutline}><div style={{position: 'relative', height: '100%', width: '50%', backgroundColor: 'black'}}></div></div>
                </div>
                <div className={styles.componentRating}>
                    <span>
                        <img src={star.src} className={styles.star}></img>
                        <img src={star.src} className={styles.star}></img>
                    </span>
                    <img src={personIcon.src} className={styles.personIcon}></img>
                    <div className={styles.barOutline}><div style={{position: 'relative', height: '100%', width: '50%', backgroundColor: 'black'}}></div></div>
                </div>
                <div className={styles.componentRating}>
                    <span>
                        <img src={star.src} className={styles.star}></img>
                    </span>
                    <img src={personIcon.src} className={styles.personIcon}></img>
                    <div className={styles.barOutline}><div style={{position: 'relative', height: '100%', width: '50%', backgroundColor: 'black'}}></div></div>
                </div>
            </div>
        </div>
    );
};

export default MovieRating;