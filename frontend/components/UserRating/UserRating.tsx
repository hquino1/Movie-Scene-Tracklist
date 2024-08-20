import styles from './UserRating.module.css';

const UserRating = () => {
    return (
        <div className={styles.backgroundContainer}>
            <div className={styles.userRatingContainer}>
                <form>
                    <div>
                        <label className={styles.nameLabel}>Name: </label>
                        <input className={styles.nameInput}></input>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <label>Comment:</label>
                        <input className={styles.commentInput}></input>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserRating;