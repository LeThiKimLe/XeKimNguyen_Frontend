import React, { useCallback, useEffect, useState } from 'react'
import Navbar from "../../../components/navbar"
import Header from "../../../components/header"
import styles from './styles.module.css'
import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faCalendarDays, faLocationDot, faTicketSimple, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { format } from 'date-fns';
import SearchItem from './searchItem'
import { useSelector } from 'react-redux'
import { selectSearchInfor, selectRearchResult } from '../../../feature/search/seach.slice'
import { selectListRoute } from '../../../feature/route/route.slice'
import { search } from 'slick/finder'
import SearchBox from '../../../components/header/searchBox'
import { TRIP_DATA } from '../../../utils/test_data'
import Footer from '../../../components/footer'
import FilterBar from './FilterBar'
import seatThunk from '../../../feature/seat/seat.service'
import { selectSeatMap } from '../../../feature/seat/seat.slice'
import { useDispatch } from 'react-redux'

const List = () => {

    const dispatch = useDispatch()
    const listRoute = useSelector(selectListRoute)
    // const listTrip = useSelector(selectRearchResult)
    const listTrip = TRIP_DATA

    const seatMap = useSelector(selectSeatMap)

    const [sortOptions, setSortOptions] = useState({
        'soon': {
            value: false,
            label: 'Khởi hành sớm nhất'
        },
        'late': {
            value: false,
            label: 'Khởi hành muộn nhất'
        }
    })

    const handleSortClick = (event) => {
        const name = event.currentTarget.dataset.name
        const value = !sortOptions[name].value
        setSortOptions((prevOptions) => ({
            ...prevOptions,
            [name]: {
                ...prevOptions[name],
                value: value
            }
        }))

        Object.keys(sortOptions).forEach(key => {
            if (key !== name && sortOptions[key].value === true) {
                setSortOptions((prevOptions) => ({
                    ...prevOptions,
                    [key]: {
                        ...prevOptions[key],
                        value: false
                    }
                }))
            }
        })
    }

    const searchInfor = useSelector(selectSearchInfor)
    const [destination, setDestination] = useState(searchInfor.searchRoute.destination.name)
    const [origin, setOrigin] = useState(searchInfor.searchRoute.departure.name)
    const [startDate, setStartDate] = useState(searchInfor.departDate)
    const [returnDay, setReturnDate] = useState(searchInfor.arrivalDate)
    const [numberTicket, setNumberTicket] = useState(searchInfor.numberTicket)
    const [turn, setTurn] = useState(searchInfor.turn)
    const [filterResult, setFilterResult] = useState(listTrip)
    const [unsortTrip, setUnsortTrip] = useState(listTrip)
    
    const setTripResult = (listResult) => {
        setFilterResult(listResult)
        setUnsortTrip(listResult)
    }

    useEffect(()=>{
        const condition = Object.entries(sortOptions).filter(([key, value]) => value.value === true)
            .map(([key, value]) => {
                return key
            })
        if (condition.length !== 0)
        {

            if (condition[0] === 'soon')
            {
                const tripAscending = [...filterResult].sort((a, b) => a.departTime - b.departTime);
                setFilterResult(tripAscending)
            }
            else if (condition[0] === 'late')
            {
                const tripDescending = [...filterResult].sort((a, b) => b.departTime - a.departTime);
                setFilterResult(tripDescending)
            }
        }
        else
        {
            setTripResult(unsortTrip)
        }

    }, [sortOptions])
    
    return (
        <div>
            <Navbar></Navbar>
            <Header type="list" />
            <div className={styles.listContainer}>
                <div className={styles.subContainer}>
                    <SearchBox listRoute={listRoute} parentClass={styles.searchBox}></SearchBox>
                    <div className={styles.listWrapper}>
                        <FilterBar listTrip={listTrip} setResult={setTripResult}></FilterBar>
                        <div className={styles.listResult} >
                            <div className={styles.searchBar}>
                                <div className={`${styles.searchItem} ${styles.searchPlace}`}>
                                    <div>
                                        <FontAwesomeIcon icon={faLocationDot} className={styles.searchItemIcon} />
                                        <input type="text"
                                            className={styles.searchInput}
                                            readOnly
                                            value={turn === 1 ? origin : destination} />
                                    </div>
                                    <div className={styles.exchangeBtn}>
                                        <FontAwesomeIcon icon={faArrowRight} className={styles.searchItemIcon} />
                                    </div>
                                    <div>
                                        <FontAwesomeIcon icon={faLocationDot} className={styles.searchItemIcon} />
                                        <input type="text"
                                            className={styles.searchInput}
                                            readOnly
                                            value={turn === 1 ? destination : origin} />
                                    </div>
                                </div>
                                <div className={`${styles.searchItem} ${styles.searchDate}`}>
                                    <FontAwesomeIcon icon={faCalendarDays} className={styles.searchItemIcon} />
                                    <input type="text" className={styles.searchInput} readOnly value={startDate} />
                                </div>
                                <div className={`${styles.searchItem} ${styles.searchNumber}`}>
                                    <FontAwesomeIcon icon={faTicketSimple} className={styles.searchItemIcon} />
                                    <input type="text" className={styles.searchInput} readOnly value={numberTicket + ' vé'} />
                                </div>
                            </div>
                            <div className={styles.searchTotal}> {`Kết quả tìm kiếm : ${filterResult.length} chuyến`}</div>
                            <div className={styles.sortArea}>
                                <div>Sắp xếp theo: </div>
                                {Object.entries(sortOptions).map(([key, value]) => (
                                    <div className={value.value === true ? `${styles.optionChoice} ${styles['optionChoice-active']}`
                                        : styles.optionChoice}
                                        onClick={handleSortClick}
                                        data-name={key}
                                        key={key}
                                >
                                        {value.label}
                                    </div>
                                ))}
                            </div>
                            <div className={styles.resultContainer}>
                                {filterResult.map((trip) => (
                                    <SearchItem trip={trip} key={trip.id}></SearchItem>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default List