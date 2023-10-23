import styles from './styles.module.css'
import { useState, useEffect } from 'react'
import FilterSet from './filterSet'


const FilterBar = ({ listTrip, setResult }) => {

    const [timeFilter, setTimeFilter] = useState(listTrip)
    const [vehicleFilter, setVehicleFilter] = useState(listTrip)
    const [colFilter, setColFilter] = useState(listTrip)
    const [rowFilter, setRowFilter] = useState(listTrip)
    const [floorFilter, setFloorFilter] = useState(listTrip)

    const [timeOptions, setTimeOptions] = useState({
        midnight: {
            value: false,
            label: 'Khuya 00:00 - 06:00'
        },
        morning: {
            value: false,
            label: 'Buổi sáng 06:00 - 12:00'
        },
        afternoon: {
            value: false,
            label: 'Buổi chiều 12:00 - 18:00'
        },
        evening: {
            value: false,
            label: 'Buổi tối 18:00 - 24:00'
        }
    })

    const [vehicleOptions, setVehicleOptions] = useState({
        'seat': {
            value: false,
            label: 'Ghế'
        },
        'bumk': {
            value: false,
            label: 'Giường'
        },
        'limousine': {
            value: false,
            label: 'Limousine'
        }
    })

    const [colOptions, setColOptions] = useState({
        'left': {
            value: false,
            label: 'Trái'
        },
        'middle': {
            value: false,
            label: 'Giữa'
        },
        'right': {
            value: false,
            label: 'Phải'
        }
    })

    const [rowOptions, setRowOptions] = useState({
        'top': {
            value: false,
            label: 'Đầu'
        },
        'middle': {
            value: false,
            label: 'Giữa'
        },
        'bottom': {
            value: false,
            label: 'Cuối'
        }
    })

    const [floorOptions, setFloorOptions] = useState({
        'up': {
            value: false,
            label: 'Tầng trên'
        },
        'down': {
            value: false,
            label: 'Tầng dưới'
        }
    })

    const handleTimeChange = (event) => {
        const { name, checked } = event.currentTarget
        setTimeOptions((prevOptions) => ({
            ...prevOptions,
            [name]: {
                ...prevOptions[name],
                value: checked
            }
        }))
    }

    const handleVehicleClick = (event) => {
        const name = event.currentTarget.dataset.name
        const value = !vehicleOptions[name].value
        setVehicleOptions((prevOptions) => ({
            ...prevOptions,
            [name]: {
                ...prevOptions[name],
                value: value
            }
        }))
    }

    const handleColClick = (event) => {
        const name = event.currentTarget.dataset.name
        const value = !colOptions[name].value
        setColOptions((prevOptions) => ({
            ...prevOptions,
            [name]: {
                ...prevOptions[name],
                value: value
            }
        }))
    }

    const handleRowClick = (event) => {
        const name = event.currentTarget.dataset.name
        const value = !rowOptions[name].value
        setRowOptions((prevOptions) => ({
            ...prevOptions,
            [name]: {
                ...prevOptions[name],
                value: value
            }
        }))
    }

    const handleFloorClick = (event) => {
        const name = event.currentTarget.dataset.name
        const value = !floorOptions[name].value
        setFloorOptions((prevOptions) => ({
            ...prevOptions,
            [name]: {
                ...prevOptions[name],
                value: value
            }
        }))
    }

    useEffect(() => {
        const conditions = Object.entries(timeOptions).filter(([key, value]) => value.value === true)
            .map(([key, value]) => {
                if (key === 'midnight')
                    return [0, 6]
                else if (key === 'morning')
                    return [6, 12]
                else if (key === 'afternoon')
                    return [12, 18]
                else
                    return [18, 24]
            })
        if (conditions.length === 0)
            setTimeFilter(listTrip)
        else {
            const filteredTrips = listTrip.filter(trip =>
                conditions.some(([start, end]) => trip.departTime >= start && trip.departTime <= end)
            )
            setTimeFilter(filteredTrips)
        }
    }, [timeOptions])

    useEffect(() => {
        const conditions = Object.entries(vehicleOptions).filter(([key, value]) => value.value === true)
            .map(([key, value]) => {
                return key
            })
        if (conditions.length === 0)
            setVehicleFilter(listTrip)
        else {
            const filteredTrips = listTrip.filter(trip =>
                conditions.some((key) => trip.bus.busType.name.includes(key))
            )
            setVehicleFilter(filteredTrips)
        }
    }, [vehicleOptions])

    useEffect(() => {
        const conditions = Object.entries(colOptions).filter(([key, value]) => value.value === true)
            .map(([key, value]) => {
                return key
            })
        if (conditions.length === 0)
            setColFilter(listTrip)
        else {
            const filteredTrips = listTrip.filter(trip =>
                conditions.some((key) => key === 'left' && trip.bus.busType.seatMap.seats
                    .some((seat) => seat.col === 0
                        && !trip.bookedSeat.includes(seat.name))
                    || key === 'right' && trip.bus.busType.seatMap.seats
                        .some((seat) => seat.col ===
                            trip.bus.busType.seatMap.colNo - 1
                            && !trip.bookedSeat.includes(seat.name))
                    || key === 'middle' && trip.bus.busType.seatMap.seats
                        .some((seat) => seat.col !== 0
                            && seat.col !== trip.bus.busType.seatMap.colNo - 1
                            && !trip.bookedSeat.includes(seat.name))
                )
            )
            setColFilter(filteredTrips)
        }

    }, [colOptions])

    useEffect(() => {
        const conditions = Object.entries(rowOptions).filter(([key, value]) => value.value === true)
            .map(([key, value]) => {
                return key
            })
        if (conditions.length === 0)
            setRowFilter(listTrip)
        else {
            const filteredTrips = listTrip.filter(trip =>
                conditions.some((key) => key === 'top' && trip.bus.busType.seatMap.seats
                    .some((seat) => (seat.row === 0 || seat.row === 1)
                        && !trip.bookedSeat.includes(seat.name))
                    || key === 'bottom' && trip.bus.busType.seatMap.seats
                        .some((seat) => (seat.row === trip.bus.busType.seatMap.rowNo - 1 ||
                                        seat.row === trip.bus.busType.seatMap.rowNo - 2 ) 
                            && !trip.bookedSeat.includes(seat.name))
                    || key === 'middle' && trip.bus.busType.seatMap.seats
                        .some((seat) => (seat.row === 0 || seat.row === 1)
                            && (seat.row !== trip.bus.busType.seatMap.rowNo - 1 ||
                                seat.row !== trip.bus.busType.seatMap.rowNo - 2 )
                            && !trip.bookedSeat.includes(seat.name))
                )
            )
            setRowFilter(filteredTrips)
        }

    }, [rowOptions])

    useEffect(() => {
        const conditions = Object.entries(floorOptions).filter(([key, value]) => value.value === true)
            .map(([key, value]) => {
                return key
            })
        if (conditions.length === 0)
            setFloorFilter(listTrip)
        else {
            const filteredTrips = listTrip.filter(trip =>
                conditions.some((key) => key==='up' && trip.bus.busType.seatMap.seats
                                .some((seat)=> seat.floor === 2 && !trip.bookedSeat.includes(seat.name)) ||
                                key==='down' && trip.bus.busType.seatMap.seats
                                .some((seat)=> seat.floor === 1 && !trip.bookedSeat.includes(seat.name))
                                )
            )
            setFloorFilter(filteredTrips)
        }

    }, [floorOptions])

    useEffect(() => {
        const commonElement = timeFilter.filter(element =>
            vehicleFilter.some((element1) => element1.id === element.id)
            && colFilter.some((element2) => element2.id === element.id)
            && rowFilter.some((element3) => element3.id === element.id)
            && floorFilter.some((element4) => element4.id === element.id)
        );
        setResult(commonElement)
    }, [timeFilter, vehicleFilter, colFilter, rowFilter, floorFilter])

    return (
        <div className={styles.listSearch}>
            <h1 className={styles.lsTitle}>Lọc</h1>
            <FilterSet type='checkbox' title='Thời gian' options={timeOptions} onChange={handleTimeChange}></FilterSet>
            <FilterSet type='button' title='Loại xe' options={vehicleOptions} onChange={handleVehicleClick}></FilterSet>
            <FilterSet type='button' title='Dãy ghế' options={colOptions} onChange={handleColClick}></FilterSet>
            <FilterSet type='button' title='Hàng ghế' options={rowOptions} onChange={handleRowClick}></FilterSet>
            <FilterSet type='button' title='Tầng dưới' options={floorOptions} onChange={handleFloorClick}></FilterSet>
        </div>
    )
}

export default FilterBar