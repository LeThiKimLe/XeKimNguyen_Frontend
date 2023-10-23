import styles from './styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightArrowLeft, faCircleDot } from '@fortawesome/free-solid-svg-icons'
import {OptionButton} from '../../../../components/common/button'
import { useEffect, useState } from 'react' 
import { convertToStamp } from '../../../../utils/unitUtils'
const Route = ({route, reverse}) => {

    const reverseSchedule = (schedule) => {
        const splited = schedule.split(' -> ');
        return splited.reverse().join(' -> ');
    }

    const cusRoute = reverse 
                    ? {...route, 
                        departure: route.destination,
                        destination: route.departure,
                        schedule: reverseSchedule(route.schedule)
                    } : route

    return (
        <div className={styles.container}>
            <div className={styles.sub_container}>

            <div className={styles.routeName}>
                <span className={styles.routePlace}>{cusRoute.departure.name}</span>
                <FontAwesomeIcon icon={faArrowRightArrowLeft}/>
                <span className={styles.routePlace}>{cusRoute.destination.name}</span>
            </div>
            <div className={styles.routeTime}>
                <FontAwesomeIcon icon={faCircleDot} />
                <div className={styles.dot}></div>
                <div className={styles.time}>{convertToStamp(cusRoute.hours)}</div>
                <div className={styles.dot}></div>
                <FontAwesomeIcon icon={faCircleDot}/>
            </div>
            <div className={styles.infor}>
                <div className={styles.infor_title}>Khoảng cách: </div>
                <span>{cusRoute.distance} km</span>
            </div>
            <div className={styles.infor}>
                <div className={styles.infor_title}>Lộ trình: </div>
                <span>{cusRoute.schedule}</span>
            </div>
            <div className={styles.infor}>
                <div className={styles.infor_title}>
                    Giá vé: 
                </div>
                <span>{`${cusRoute.price.toLocaleString()} VND`}</span>
            </div>
            <div className={styles.searchArea}>
                <i className={styles.note}>* Giá vé chưa bao gồm phụ phí xe, dịp lễ</i>
                <OptionButton text="Tìm chuyến xe" className={styles.findBtn}></OptionButton>
            </div>
            </div>  
        </div>
    )
}

export default Route
