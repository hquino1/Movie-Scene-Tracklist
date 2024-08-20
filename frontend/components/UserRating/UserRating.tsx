import styles from './UserRating.module.css';

const UserRating = () => {
    return (
        <div className={styles.backgroundContainer}>
            <h2 className={styles.movieTitle}>Deadpool & Wolverine</h2>
            <form className={styles.ratingForm}>
                <div className={styles.usernameInput}>
                    <label className={styles.usernameInputName}>Enter Name:</label>
                    <input className={styles.usernameInputBox}></input>
                </div>
                <div className={styles.starRatingContainer}>
                </div>
                <div><input></input></div>
            </form>
            <div className={styles.ratingDecision}>
                <button className={styles.ratingButton}>Cancel</button>
                <button className={styles.ratingButton}>Submit</button>
            </div>
        </div>
    );
};

export default UserRating;