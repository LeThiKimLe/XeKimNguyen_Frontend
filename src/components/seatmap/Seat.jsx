import './seatmap.css'
import seat_active from '../../assets/seat_active.svg'
import seat_disabled from '../../assets/seat_disabled.svg'
import seat_selecting from '../../assets/seat_selecting.svg'
import React, { useState, memo, useCallback, useMemo } from "react";

const Seat = ({ seatName, state, chooseSeat }) => {

    console.log('render seat '+ seatName)
  
    return (
      <div onClick={state!=="booked" ? chooseSeat: null} className={seatName!=="empty" ? 'seatbox' : 'seatbox empty'} >
        {state==='active' && (<img src={seat_active} alt="seat_active" className='seat_icon' />)}
        {state==='booked' && (<img src={seat_disabled} alt="seat_active" className='seat_icon' />)}
        {state==='selecting' && (<img src={seat_selecting} alt="seat_active" className='seat_icon' />)}
        <div className='seatname'>{seatName}</div>
      </div>
    );
  };

export default memo(Seat)