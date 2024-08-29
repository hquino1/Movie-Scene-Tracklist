import styles from './MovieRating.module.css';
import { db } from '@/app/firebase/config';
import { doc, collection, getDoc } from 'firebase/firestore';
import { useEffect } from 'react';

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
                <div className={styles.componentRating}></div>
                <div className={styles.componentRating}></div>
                <div className={styles.componentRating}></div>
                <div className={styles.componentRating}></div>
                <div className={styles.componentRating}></div>
            </div>
        </div>
    );
};

export default MovieRating;