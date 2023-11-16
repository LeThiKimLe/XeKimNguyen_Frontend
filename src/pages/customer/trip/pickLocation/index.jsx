import styles from './styles.module.css'
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, memo, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { addHoursToTime } from '../../../../utils/unitUtils';
import { selectCurrentTrip } from '../../../../feature/trip/trip.slice';
import { useSelector } from 'react-redux';

const PickLocation = ({ pick, listLocation, setLocation, selected, getObject }) => {

    const trip = useSelector(selectCurrentTrip)

    const handleOptionChange = (event) => {
       
        if (getObject)
        {
            setLocation(listLocation.filter((location)=> location.id == event.target.value)[0])
        }
        else
            setLocation(event.target.value)
    }

    return (
        <div className={`${styles.pick_container} ${pick ? styles.pick_separate : ''}`}>
            { !getObject && <h3 className={styles.pick_title}>{pick ? "Điểm đón" : "Điểm trả"}</h3>}
            <div className={styles.list_locations}>
                {listLocation.map((location) => (
                    <div key={`${location.id}`} className={styles.pick_location}>
                        <label className={selected == location.id ? `${styles.location_label} ${styles.selected}` : styles.location_label}>

                            <input
                                type="radio"
                                value={location.id}
                                checked={selected == location.id}
                                onChange={handleOptionChange}
                                className={styles.pick_radio}
                            />

                            <span className={styles.location_time}>{addHoursToTime(trip.departTime, location.arrivalTime)}</span>
                            <span>-</span>
                            <span className={styles.location_name}>{location.station.name}</span>

                        </label>
                        <div className={styles.location_addr}>
                            <FontAwesomeIcon icon={faLocationDot} />
                            <span>{location.station.address}
                                <a href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`} target="_blank">Xem vị trí</a>
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