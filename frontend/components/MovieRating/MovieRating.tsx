import styles from './MovieRating.module.css';
import { db } from '@/app/firebase/config';
import { doc, collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import personIcon from '@/public/assets/bPersonIcon.png';
import star from '@/public/assets/icons8-star-48.png';


interface ratingData{
    movieName: string,
    userReview: string,
    date: string,
    score: string,
    userReviewName: string
}


interface movieRatingProps{
    movieName: string,
    getAvgScore: (score: number) => void;
};

const MovieRating: React.FC<movieRatingProps> = ({movieName, getAvgScore}) =>{
    const [ratings, setRatings] = useState([]);
    const [avgRating, setAvgRating] = useState(0);
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
                setAmountOfReviews(allData.length);
                let sumOfRatings = 0;                
                let tempMap = new Map<number, number>([
                    [1, 0],
                    [2, 0],
                    [3, 0],
                    [4, 0],
                    [5, 0]
                ]);
                allData.forEach(review => {
                    const key = parseInt(review.score);
                    sumOfRatings += key;
                    if (tempMap.has(key)){
                        tempMap.set(key, tempMap.get(key)! + 1); 
                    }
                });
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
                    <div className={styles.barOutline}><div style={{position: 'relative', height: '100%', width: `${(ratingCounts.get(5)! / amountOfReviews) * 100}%`, backgroundColor: 'black'}}></div><p className={styles.barAmount}>{ratingCounts.get(5)}</p></div>
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
                    <div className={styles.barOutline}>{ratingCounts.get(1)}<div style={{position: 'relative', height: '100%', width: '50%', backgroundColor: 'black'}}></div></div>
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