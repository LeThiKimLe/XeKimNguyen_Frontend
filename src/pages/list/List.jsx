import React, { useState } from 'react'
import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import './list.css'
import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationDot, faMagnifyingGlass, faRightLeft } from "@fortawesome/free-solid-svg-icons"
import { format } from 'date-fns';
import SearchItem from '../../components/searchItem/SearchItem'
import { el } from 'date-fns/locale'



const List = () => {

    const [timeOptions, setTimeOptions] = useState({
        'Midnight 00:00 - 06:00': true,
        'Morning 06:00 - 12:00': false,
        'Afternoon 12:00 - 18:00': false,
        'Evening 18:00 - 24:00': false
    })

    const [vehicleOptions, setVehicleOptions] = useState({
        'Seat': false,
        'Bunk': false,
        'Limousine': false,
    })

    const [rowOptions, setRowOptions] = useState({
        'Left': false,
        'Middle': false,
        'Right': false,
    })

    const [floorOptions, setFloorOptions] = useState({
        'Up': false,
        'Down': false
    })

    const [sortOptions, setSortOptions] = useState({
        'Khởi hành sớm nhất': false,
        'Khởi hành muộn nhất': false
    })

    const handleTimeChange = (event) => {
        const { name, checked } = event.currentTarget
        setTimeOptions((prevOptions) => ({
            ...prevOptions,
            [name]: checked
        }))
    }

    const handleVehicleClick = (event) => {
        const name = event.currentTarget.dataset.name
        const value = !vehicleOptions[name]
        setVehicleOptions((prevOptions) => ({
            ...prevOptions,
            [name]: value
        }))
    }

    const handleRowClick = (event) => {
        const name = event.currentTarget.dataset.name
        const value = !rowOptions[name]
        setRowOptions((prevOptions) => ({
            ...prevOptions,
            [name]: value
        }))
    }

    const handleFloorClick = (event) => {
        const name = event.currentTarget.dataset.name
        const value = !floorOptions[name]
        setFloorOptions((prevOptions) => ({
            ...prevOptions,
            [name]: value
        }))
    }

    const handleSortClick = (event) => {
        const name = event.currentTarget.dataset.name
        const value = !sortOptions[name]
        setSortOptions((prevOptions) => ({
            ...prevOptions,
            [name]: value
        }))

        Object.keys(sortOptions).forEach(key => {
            if (key !== name && sortOptions[key] === true )
            {
                setSortOptions((prevOptions) => ({
                    ...prevOptions,
                    [key]: false
                }))
            }
        })
    }

    const location = useLocation()
    const [destination, setDestination] = useState(location.state.destinatePlace)
    const [origin, setOrigin] = useState(location.state.originPlace)
    const [startDate, setStartDate] = useState(location.state.startDate)
    const [returnDay, setReturnDate] = useState(location.state.returnDate)
    const [numberTicket, setNumberTicket] = useState(location.state.numberTicket)
    const startDay = format(new Date(startDate), 'dd/MM/yyyy');

    return (
        <div>
            <Navbar></Navbar>
            <Header type="list"/>
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
                        <h1 className="lsTitle">Search</h1>
                        <div className="lsItem">
                            <label htmlFor="" className='lsItemTitle'>Departure time</label>
                            <div className='timeOptionContainer'>
                                {Object.entries(timeOptions).map(([key, value]) => (
                                    <div className='timeOptionItem'>
                                        <label htmlFor={key} className='timeLabel'>
                                            <input type="checkbox"
                                                name={key}
                                                checked={value}
                                                onChange={handleTimeChange}
                                                className='timeOption' />
                                            {key}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lsItem">
                            <label htmlFor="" className='lsItemTitle'>Vehicle Type</label>
                            <div className='optionContainer '>
                                {Object.entries(vehicleOptions).map(([key, value]) => (
                                    <div className={value === true ? "optionChoice optionChoice-active" : "optionChoice"} onClick={handleVehicleClick} data-name={key}>
                                        {key}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="lsItem">
                            <label htmlFor="" className='lsItemTitle'>Row of Seats</label>
                            <div className='optionContainer '>
                                {Object.entries(rowOptions).map(([key, value]) => (
                                    <div className={value === true ? "optionChoice optionChoice-active" : "optionChoice"} onClick={handleRowClick} data-name={key}>
                                        {key}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="lsItem">
                            <label htmlFor="" className='lsItemTitle'>Floor</label>
                            <div className='optionContainer '>
                                {Object.entries(floorOptions).map(([key, value]) => (
                                    <div className={value === true ? "optionChoice optionChoice-active" : "optionChoice"} onClick={handleFloorClick} data-name={key}>
                                        {key}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="listResult">
                        <div className='searchBar'>
                            <div className="searchItem searchPlace">
                                <div>
                                    <FontAwesomeIcon icon={faLocationDot} className='searchItemIcon'/>
                                    <input type="text" className='searchInput' placeholder={origin['label']}/>
                                </div>
                                <div className='exchangeBtn'>
                                    <FontAwesomeIcon icon={faRightLeft} className='searchItemIcon'/>
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faLocationDot} className='searchItemIcon'/>
                                    <input type="text" className='searchInput' placeholder={destination['label']} />
                                </div>
                            </div>
                            <div className="searchItem searchDate">
                                <FontAwesomeIcon icon={faLocationDot} className='searchItemIcon'/>
                                <input type="text" className='searchInput' placeholder={startDay}/>
                            </div>
                            <div className="searchItem searchNumber">
                                <FontAwesomeIcon icon={faLocationDot} className='searchItemIcon'/>
                                <input type="text" className='searchInput' placeholder={numberTicket + ' vé'}/>
                            </div>
                            <div className="searchItem searchBtn">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />    
                            </div>
                        </div>
                        <div className='searchTotal'> {origin['label']} - {destination['label']} : 9 chuyến </div>
                        <div className="sortArea">
                            <div>Sắp xếp theo: </div>
                            {Object.entries(sortOptions).map(([key, value]) => (
                                    <div className={value === true ? "optionChoice optionChoice-active" : "optionChoice"} onClick={handleSortClick} data-name={key}>
                                        {key}
                                    </div>
                                ))}
                        </div>
                        <SearchItem trip='123'></SearchItem>
                        <SearchItem trip='456'></SearchItem>
                        <SearchItem trip='789w3'></SearchItem>
                        <SearchItem trip='23456'></SearchItem>
                        <SearchItem trip='123456'></SearchItem>
                        <SearchItem trip='assas'></SearchItem>
                        <SearchItem></SearchItem>
                        <SearchItem></SearchItem>
                        <SearchItem></SearchItem>
                        <SearchItem></SearchItem>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List