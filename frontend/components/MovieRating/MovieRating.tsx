import styles from './MovieRating.module.css';
import { db } from '@/app/firebase/config';
import { doc, collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import personIcon from '@/public/assets/bPersonIcon.png';
import star from '@/public/assets/icons8-star-100.png';
import UserCommentDisplay from '../UserCommentDisplay/UserCommentDisplay';

interface ratingData{
    movieName: string,
    userReview: string,
    date: Timestamp,
    score: string,
    userReviewName: string
}


interface movieRatingProps{
    movieName: string,
    getAvgScore: (score: number) => void;
};

const MovieRating: React.FC<movieRatingProps> = ({movieName, getAvgScore}) =>{
    const [ratings, setRatings] = useState([]);
    //let newRecentComments: ratingData[] = [];
    const [avgRating, setAvgRating] = useState(0);
    const [recentComments, setRecentComments] = useState<ratingData[]>([]);
    const [isDataAvailable, setIsDataAvailable] = useState(false);
    const [amountOfReviews, setAmountOfReviews] = useState(0);
    const [ratingCounts, setRatingCounts] = useState<Map<number, number>>(new Map([
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
        [5, 0]
    ]))

    useEffect(() => {
        const getUserReviewData = async() =>{
            const docRef = collection(db, "reviews");
            const q = query(docRef, where("movieName", "==", movieName));
            const userData = await getDocs(q);

            let allData: ratingData[] = [];
            userData.forEach(doc => {
                allData.push(doc.data() as ratingData);  
            });

            if(allData.length >= 0){
                setIsDataAvailable(true);
                setAmountOfReviews(allData.length);
                let sumOfRatings = 0;                
                let tempMap = new Map<number, number>([
                    [1, 0],
                    [2, 0],
                    [3, 0],
                    [4, 0],
                    [5, 0]
                ]);
                let newRecentComments: ratingData[] = [];

                allData.forEach(review => {
                    if(recentComments.length < 5){
                        newRecentComments.push(review);
                        //const date = new Date(review.date.seconds);
                        console.log("REVIEW ARRAY: ", review.userReviewName);
                    }
                    const key = parseInt(review.score);
                    sumOfRatings += key;
                    if (tempMap.has(key)){
                        tempMap.set(key, tempMap.get(key)! + 1); 
                    }
                });
                setRecentComments(newRecentComments);
                console.log("SUM:", sumOfRatings);
                setRatingCounts(tempMap); 
                //setAvgRating(sumOfRatings/allData.length);
                getAvgScore(sumOfRatings/ allData.length);

            } else{
                console.log("No Reviews found for this movie");
            }
        };
        getUserReviewData();
    }, [movieName]);

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
                    <div className={styles.barOutline}><div style={{position: 'relative', height: '100%', width: `${(ratingCounts.get(5)! / amountOfReviews) * 100}%`, backgroundColor: 'green', borderRadius: '8.5px'}}></div><p className={styles.barAmount}>{ratingCounts.get(5)}</p></div>
                </div>
                <div className={styles.componentRating}>
                    <span>
                        <img src={star.src} className={styles.star}></img>
                        <img src={star.src} className={styles.star}></img>
                        <img src={star.src} className={styles.star}></img>
                        <img src={star.src} className={styles.star}></img>
                    </span>
                    <img src={personIcon.src} className={styles.personIcon}></img>
                    <div className={styles.barOutline}><div style={{position: 'relative', height: '100%', width: `${(ratingCounts.get(4)! / amountOfReviews) * 100}%`, backgroundColor: 'lawngreen', borderRadius: '8.5px'}}></div><p className={styles.barAmount}>{ratingCounts.get(4)}</p></div>
                </div>
                <div className={styles.componentRating}>
                    <span>
                        <img src={star.src} className={styles.star}></img>
                        <img src={star.src} className={styles.star}></img>
                        <img src={star.src} className={styles.star}></img>
                    </span>
                    <img src={personIcon.src} className={styles.personIcon}></img>
                    <div className={styles.barOutline}><div style={{position: 'relative', height: '100%', width: `${(ratingCounts.get(3)! / amountOfReviews) * 100}%`, backgroundColor: 'yellow', borderRadius: '8.5px'}}></div><p className={styles.barAmount}>{ratingCounts.get(3)}</p></div>
                </div>
                <div className={styles.componentRating}>
                    <span>
                        <img src={star.src} className={styles.star}></img>
                        <img src={star.src} className={styles.star}></img>
                    </span>
                    <img src={personIcon.src} className={styles.personIcon}></img>
                    <div className={styles.barOutline}><div style={{position: 'relative', height: '100%', width: `${(ratingCounts.get(2)! / amountOfReviews) * 100}%`, backgroundColor: 'orange', borderRadius: '8.5px'}}></div><p className={styles.barAmount}>{ratingCounts.get(2)}</p></div>
                </div>
                <div className={styles.componentRating}>
                    <span>
                        <img src={star.src} className={styles.star}></img>
                    </span>
                    <img src={personIcon.src} className={styles.personIcon}></img>
                    <div className={styles.barOutline}><div style={{position: 'relative', height: '100%', width: `${(ratingCounts.get(1)! / amountOfReviews) * 100}%`, backgroundColor: 'red', borderRadius: '8.5px'}}></div><p className={styles.barAmount}>{ratingCounts.get(1)}</p></div>
                </div>
            </div>
            {isDataAvailable && <UserCommentDisplay reviews={recentComments}></UserCommentDisplay>}
            {!isDataAvailable && <div>No Data is currently Available. Be the first to comment and rate!</div>}
        </div>
    );
};

export default MovieRating;