import styles from './styles.module.css'
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, memo } from 'react'
import { v4 as uuidv4 } from 'uuid';

const PickLocation = ({pick,listLocation, setLocation, selected}) => {
    
    const handleOptionChange = (event) => {
        setLocation(event.target.value)
    }

    return(
        <div className={`${styles.pick_container} ${pick? styles.pick_separate:''}`}>
            <h3 className={styles.pick_title}>{pick?"Điểm đón":"Điểm trả"}</h3>
            <div className={styles.list_locations}>
                {listLocation.map((location) => (
                <div key={`${location.id} - ${location.time}`} className={styles.pick_location}>
                    <label className={selected==location.id ? `${styles.location_label} ${styles.selected}`: styles.location_label}>
                        <input
                            type="radio"
                            value={location.id}
                            checked={selected==location.id}
                            onChange={handleOptionChange}
                            className= {styles.pick_radio}
                        />
                        
                        <span className={styles.location_time}>{location.time}</span>
                        <span>-</span>
                        <span className={styles.location_name}>{location.name}</span>

                    </label>
                    <div className={styles.location_addr}>
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>{location.address}
                            <a href={location.url} target="_blank">Xem vị trí</a>
                        </span>
                    </div>
                  </div>
                  )
                )}
            </div>
        </div>
    )
}

export default memo(PickLocation)