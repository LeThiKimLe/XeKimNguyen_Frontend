import './pick_location.css'
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, memo } from 'react'
import { v4 as uuidv4 } from 'uuid';

const PickLocation = ({pick,listLocation, setLocation, selected}) => {
    
    const handleOptionChange = (event) => {
        setLocation(event.target.value)
    }

    return(
        <div className={`pick_container ${pick? 'pick_separate':''}`}>
            <h3 className='pick_title'>{pick?"Điểm đón":"Điểm trả"}</h3>
            <div className='list_locations'>
                {listLocation.map((location) => (
                <div key={location.id} className='pick_location'>
                    <label className={selected==location.id ? 'location_label selected': 'location_label'}>
                        <input
                            type="radio"
                            value={location.id}
                            checked={selected==location.id}
                            onChange={handleOptionChange}
                            className='pick_radio'
                        />
                        
                        <span className='location_time'>{location.time}</span>
                        <span>-</span>
                        <span className='location_name'>{location.name}</span>

                    </label>
                    <div className='location_addr'>
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