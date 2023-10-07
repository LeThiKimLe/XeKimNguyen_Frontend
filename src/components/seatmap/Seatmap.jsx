import './seatmap.css'
import seatmapData from '../../map/seatmapv2.json'
import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import seat_active from '../../assets/seat_active.svg'
import seat_disabled from '../../assets/seat_disabled.svg'
import seat_selecting from '../../assets/seat_selecting.svg'
import Seat from './Seat';

const SeatMap = ({ type, booked, selectedSeats, handleSeatClick }) => {
  // const [selectedSeats, setSelectedSeats] = useState([]);
  
  const handleSeatChoose = (seatName) => {
      handleSeatClick(seatName)
  };

  const dataMap = useMemo(() => {
    try {
      return seatmapData[type];
    } catch (error) {
      console.error("Error reading seatmap data:", error);
      return {};
    }
  }, [type]);

  // const booked = useMemo(()=>['A01', 'A02', 'B09', 'B10'])

  return (
    <div className='seat_area'>
      <div className='seat_container'>
        <div className='map_container'>
          {Array.from({ length: dataMap.floor_no }, (_, index) => index).map((floorNumber) => (
            <div key={floorNumber} className='seatfloor'>
              {dataMap.floor_no !== 1 && (<div className="floor_title">{floorNumber === 0 ? 'Tầng dưới' : 'Tầng trên'}</div>)}
              {Array.from({ length: dataMap.row_no }, (_, index) => index).map((rowNumber) => (
                <div key={rowNumber} className='seatrow'>
                  {dataMap.seat_map[floorNumber].seat_name[rowNumber].map((seatname, colNumber) => (
                    <div key={colNumber}>
                      {seatname !== "" ?
                        <Seat
                          seatName={seatname}
                          key={`${floorNumber}-${rowNumber}-${colNumber}`}
                          state={booked.includes(seatname) ? 'booked' : (selectedSeats.includes(seatname) ? 'selecting' : 'active')}
                          chooseSeat={() => handleSeatChoose(seatname)}
                        /> : (
                          <Seat seatName="empty"
                            key={`${floorNumber}-${rowNumber}-${colNumber}`}
                            state="booked"
                          ></Seat>
                        )
                      }
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="seat_note">
        <h3>Chú thích</h3>
        <div className='seat_note-decs'>
          <img src={seat_active} alt="" />
          Còn trống
        </div>
        <div className='seat_note-decs'>
          <img src={seat_disabled} alt="" />
          Đã bán
        </div>
        <div className='seat_note-decs'>
          <img src={seat_selecting} alt="" />
          Đang chọn
        </div>
      </div>
    </div>
  );
};

export default memo(SeatMap);