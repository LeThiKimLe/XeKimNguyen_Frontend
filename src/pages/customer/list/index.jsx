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
import Loading from '../../../components/loading'
import notfound from '../../../assets/notfound.png'
import searchThunk from '../../../feature/search/search.service'
import { convertTimeToInt } from '../../../utils/unitUtils'

const List = () => {

    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const listRoute = useSelector(selectListRoute)
    const listTrip = useSelector(selectRearchResult)

    const [search, setSearch] = useState(true)
    const seatMap = useSelector(selectSeatMap)
    const [resetFilter, setResetFilter] = useState(false)

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

    const [backupTrips, setBackupTrips] = useState(listTrip)

    const [sortState, setSortState] = useState('')

    const handleSortClick = (event) => {
        const name = event.currentTarget.dataset.name
        const value = !sortOptions[name].value

        if (value === true)
            setSortState(name)
        else
            setSortState('')

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

    //search infor
    const searchInfor = useSelector(selectSearchInfor)

    //search result
    const [filterResult, setFilterResult] = useState(listTrip)
    const [unsortTrip, setUnsortTrip] = useState(listTrip)

    const setTripResult = (listResult, unsortList) => {
        setFilterResult(listResult)
        if (unsortList)
            setUnsortTrip(unsortList)
        else
            setUnsortTrip(listResult)
    }

    useEffect(() => {
        const condition = Object.entries(sortOptions).filter(([key, value]) => value.value === true)
            .map(([key, value]) => {
                return key
            })
        if (condition.length !== 0) {

            if (condition[0] === 'soon') {
                const tripAscending = [...filterResult].sort((a, b) => convertTimeToInt(a.departTime) - convertTimeToInt(b.departTime));
                setFilterResult(tripAscending)
            }
            else if (condition[0] === 'late') {
                const tripDescending = [...filterResult].sort((a, b) => convertTimeToInt(b.departTime) - convertTimeToInt(a.departTime));
                setFilterResult(tripDescending)
            }
        }
        else {
            setTripResult(unsortTrip)
        }
    }, [sortOptions])

    const triggerSearch = (value) => {
        setSearch(value)
    }

    useEffect(() => {
        if (search === true) {
            setLoading(true)
            setResetFilter(true)
            window.scrollTo(0, 330);
            dispatch(searchThunk.getTrips(searchInfor))
                .unwrap()
                .then(() => {
                    setLoading(false)
                    setSearch(false)
                    setResetFilter(false)
                }
                )
                .catch((error) => {
                    setLoading(false)
                    setSearch(false)
                    setResetFilter(false)
                })
        }
    }, [search]);

    useEffect(() => {
        setFilterResult(listTrip)
        setUnsortTrip(listTrip)
        setBackupTrips(listTrip)
    }, [listTrip])

    useEffect(() => {
        if (resetFilter === true) {
            Object.entries(sortOptions).filter(([key, value]) => value.value === true)
                .forEach(([key, value]) => {
                    setSortOptions((prevOptions) => ({
                        ...prevOptions,
                        [key]: {
                            ...prevOptions[key],
                            value: false
                        }
                    }))
                })
        }

    }, [resetFilter])

    return (
        <div>
            <Navbar></Navbar>
            <Header type="list" />
            <div className={styles.listContainer}>
                <div className={styles.subContainer}>
                    <SearchBox listRoute={listRoute} parentClass={styles.searchBox} setSearchAction={triggerSearch}></SearchBox>
                    <div className={styles.listWrapper}>
                        <FilterBar listTrip={backupTrips} sort={sortState} setResult={setTripResult} reset={resetFilter}></FilterBar>
                        <div className={styles.listResult} >
                            <div className={styles.searchBar}>
                                <div className={`${styles.searchItem} ${styles.searchPlace}`}>
                                    <div>
                                        <FontAwesomeIcon icon={faLocationDot} className={styles.searchItemIcon} />
                                        <input type="text"
                                            className={styles.searchInput}
                                            readOnly
                                            value={searchInfor.turn === 1 ? searchInfor.searchRoute.departure.name
                                                : searchInfor.searchRoute.destination.name} />
                                    </div>
                                    <div className={styles.exchangeBtn}>
                                        <FontAwesomeIcon icon={faArrowRight} className={styles.searchItemIcon} />
                                    </div>
                                    <div>
                                        <FontAwesomeIcon icon={faLocationDot} className={styles.searchItemIcon} />
                                        <input type="text"
                                            className={styles.searchInput}
                                            readOnly
                                            value={searchInfor.turn === 1 ? searchInfor.searchRoute.destination.name
                                                : searchInfor.searchRoute.departure.name} />
                                    </div>
                                </div>
                                <div className={`${styles.searchItem} ${styles.searchDate}`}>
                                    <FontAwesomeIcon icon={faCalendarDays} className={styles.searchItemIcon} />
                                    <input type="text" className={styles.searchInput} readOnly value={searchInfor.departDate} />
                                </div>
                                <div className={`${styles.searchItem} ${styles.searchNumber}`}>
                                    <FontAwesomeIcon icon={faTicketSimple} className={styles.searchItemIcon} />
                                    <input type="text" className={styles.searchInput} readOnly value={searchInfor.numberTicket + ' vé'} />
                                </div>
                            </div>
                            <div className={styles.searchTotal}>
                                {`Kết quả tìm kiếm : ${loading ? '-' : filterResult.length} chuyến`}
                            </div>
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
                                {loading ? (<Loading scale={0.7}></Loading>) : (
                                    <div>
                                        {filterResult.length === 0 ? (
                                            <div className={styles.notfound}>
                                                <p>Không tìm thấy chuyến xe</p>
                                                <img src={notfound} alt="" />
                                            </div>
                                        ) :
                                            (
                                                <>
                                                    {filterResult.map((trip) => (
                                                        <SearchItem trip={trip} key={trip.id}></SearchItem>
                                                    ))}
                                                </>
                                            )}
                                    </div>
                                )}
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