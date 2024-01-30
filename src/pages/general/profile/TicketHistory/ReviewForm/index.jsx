import styles from './styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faStar } from '@fortawesome/free-solid-svg-icons'
import Button from '../../../../../components/common/button'
import { useState } from 'react'
import { getTripJourney } from '../../../../../utils/tripUtils'
import { convertToDisplayDate } from '../../../../../utils/unitUtils'
const ReviewForm = ({closeForm, trip}) => {
    const [starNumber, setStarNumber] = useState(0)
    const [review, setReview] = useState(0)
    const preventClose = (e) => {
        e.stopPropagation()
    }
    console.log(trip)
    return (
        <div className={styles.container} onClick={closeForm}>
            <div className={styles.mask}></div>
            <div className={styles.content} onClick={preventClose}>
                <div className={styles.directBtn}>
                    <div>FORM ĐÁNH GIÁ</div>
                    <div onClick={closeForm}>
                        <FontAwesomeIcon icon={faXmark} color='grey' size={'2x'} />
                    </div>
                </div>
                <div className={styles.action_content}>
                    <div className={styles.review_content}>
                        <b><i className={styles.action_title}>Chuyến xe:</i></b>
                        <span>{getTripJourney(trip.trip)}</span>
                        <br></br>
                        <b><i className={styles.action_title}>Khởi hành:</i></b>
                        <span>{`${convertToDisplayDate(trip.tickets[0]?.schedule.departDate)} - ${trip.tickets[0]?.schedule.departTime.slice(0, -3)}`}</span>
                        <span style={{paddingRight:'20px'}}></span>
                        <b><i className={styles.action_title}>Ghế:</i></b>
                        <span>{trip.tickets[0]?.seat}</span>
                        <div className={styles.split}></div>
                        <b className={styles.action_title}><i>Chất lượng chuyến đi:</i></b>
                        <span className={styles.action_rating}>
                            <FontAwesomeIcon 
                                icon={faStar} 
                                className={starNumber >= 1 ? styles['review_star--active'] : styles['review_star']} 
                                onMouseEnter={() => setStarNumber(1)}
                                onMouseLeave={()=> setStarNumber(review)}
                                onClick={() => setReview(1)}
                            />
                            <FontAwesomeIcon 
                                icon={faStar} 
                                className={starNumber >= 2 ? styles['review_star--active'] : styles['review_star']} 
                                onMouseEnter={() => setStarNumber(2)}
                                onMouseLeave={()=> setStarNumber(review)}
                                onClick={() => setReview(2)}
                            />
                            <FontAwesomeIcon 
                                icon={faStar} 
                                className={starNumber >= 3 ? styles['review_star--active'] : styles['review_star']} 
                                onMouseEnter={() => setStarNumber(3)}
                                onMouseLeave={()=> setStarNumber(review)}
                                onClick={() => setReview(3)}
                            />
                            <FontAwesomeIcon 
                                icon={faStar} 
                                className={starNumber >= 4 ? styles['review_star--active'] : styles['review_star']} 
                                onMouseEnter={() => setStarNumber(4)}
                                onMouseLeave={()=> setStarNumber(review)}
                                onClick={() => setReview(4)}
                            />
                            <FontAwesomeIcon 
                                icon={faStar} 
                                className={starNumber >= 5 ? styles['review_star--active'] : styles['review_star']} 
                                onMouseEnter={() => setStarNumber(5)}
                                onMouseLeave={()=> setStarNumber(review)}
                                onClick={() => setReview(5)}
                            />
                        </span>
                        <div className={styles.action_title}><b>Đánh giá của bạn</b></div>
                        <textarea className={styles.review_input} placeholder='Viết đánh giá'>
                        </textarea>
                    </div>
                    <Button text="Gửi đánh giá"></Button>
                </div>
            </div>
        </div>
    )
}

export default ReviewForm