import styles from './MovieRating.module.css';
import { db } from '@/app/firebase/config';
import { doc, collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect } from 'react';
import personIcon from '@/public/assets/bPersonIcon.png';
import star from '@/public/assets/icons8-star-48.png';


interface movieRatingProps{
    movieName: string,
};

const MovieRating: React.FC<movieRatingProps> = ({movieName}) =>{

    useEffect(() => {
        const getUserReviewData = async() =>{
            const docRef = collection(db, "reviews");
            const q = query(docRef, where("movieName", "==", movieName));
            const userData = await getDocs(q);
            let allData = [];
            userData.forEach(doc => {
                allData.push(doc.data())  
                console.log(`${doc.id} => ${allData[1].userReview}`);
            });
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