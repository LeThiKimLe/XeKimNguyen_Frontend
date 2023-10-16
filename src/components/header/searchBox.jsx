import styles from './styles.module.css'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { searchAction } from '../../feature/search/seach.slice';
import { selectSearchInfor } from '../../feature/search/seach.slice';
import { createListRoutes } from '../../utils/test_data'
import {useState, useRef, useCallBack, useEffect, useMemo} from 'react'
import Message from '../message';
import { ROUTE_DATA } from '../../utils/test_data';
import { faBus, faHouse, faTicket, faFileInvoice, faPhone, faUsers, faCalendarDays, faLocationDot, faTicketSimple } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import DatePicker from 'react-datepicker';
import Button from "../common/button";
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';
import {format, parse} from 'date-fns';

const SearchBox = () => {
    const list_route = useRef(ROUTE_DATA)
    const {t, i18n} = useTranslation();
    const dispatch = useDispatch()
    const searchInfor = useSelector(selectSearchInfor)
    const [originPlace, setOriginPlace] = useState('')
    const [destinatePlace, setDestinatePlace] = useState('')
    const {listDeparture, listDestination} = useMemo(()=>createListRoutes(), [])
    const originPlaceInput = useRef(null);
    const [message, setMessage] = useState({content: '', repeat:0})
    const navigate = useNavigate()

    const setSearchInfor = (propName, propValue) => {
        dispatch(searchAction.setSearch({propName: propName, propValue:propValue}))
    }


    const checkOrigin = () => {
        if (originPlace==='')
        {
            originPlaceInput.current.focus();
            setMessage({content:'Hãy chọn điểm đi', repeat:Date.now()})
            
        }
        else
        {
            setDestinatePlace('')
            setMessage('')
        }
    }

    const chooseOriginDate = (date) => {
        setSearchInfor('departDate', format(date, 'dd/MM/yyyy'))
    };

    const chooseReturnDate = (date) => {
        setSearchInfor('arrivalDate', format(date, 'dd/MM/yyyy'));
    }

    const chooseTicketNumber = (amount) => {
        const new_quatity = searchInfor.numberTicket + amount
        if (new_quatity >= 1 && new_quatity<=5)
            setSearchInfor('numberTicket', new_quatity)
    }

    const handleSearch = () => {
        navigate('/trips');
    }

    useEffect(()=> {
        if (destinatePlace!==''){
            const selectedTrip = list_route.current.filter((route) => route.id === destinatePlace.value.id)[0]
            setSearchInfor('seachRoute',selectedTrip)
            setSearchInfor('turn', destinatePlace.value.turn)
        }
    }, [destinatePlace])
    
    return (
        <>
        {message.content!=='' && <Message message={message.content} repeat={message.repeat}/>}
        <h1 className={styles.headerTitle}>{t('header.welcome')}</h1>
        <p className={styles.headerDesc}>{t('header.promo')}</p>
        <div className={styles.headerSearch}>
            <div className={styles.tripTypeBox}>
                <label className={styles.tripTypeBoxItem}>
                    <input
                        type="radio" 
                        value="one_way"
                        checked={searchInfor.oneway === true}
                        className={styles.radioBox}
                        onChange={()=>setSearchInfor('oneway', true)}
                    />
                    <span>{t('header.searchbox.one_way')}</span>
                </label>

                <label className={styles.tripTypeBoxItem}>
                    <input
                        type="radio" 
                        value="round_trip"
                        checked={searchInfor.oneway === false}
                        className={styles.radioBox}
                        onChange={()=>setSearchInfor('oneway', false)} 
                        />

                    <span>{t('header.searchbox.round_trip')}</span>
                </label>
            </div>
            <div className={styles.headerSearchList}>
                <div className={styles.headerSearchItem}>
                    <FontAwesomeIcon icon={faBus} className={styles.headerIcon}/>
                    <div className={styles.selectArea}>
                        <div className={styles.selectTitle}>{t('header.searchbox.origin')}</div>
                        <Select options={listDeparture.map((dep)=> {return {value: dep.key, label: dep.location.name}})}
                                ref={originPlaceInput}
                                value={originPlace}
                                onChange={setOriginPlace}
                                className={styles.selectItem}
                                placeholder="Origin">
                        </Select>
                    </div>
                    
                </div>
            
                <div className={styles.headerSearchItem}>
                    <FontAwesomeIcon icon={faLocationDot} className={styles.headerIcon}/>
                    <div className={styles.selectArea}>
                        <div className={styles.selectTitle}>{t('header.searchbox.destination')}</div>
                        
                        <Select options={originPlace!==''?(listDestination.filter((des)=>des.key === originPlace.value)[0].location.map(
                                                            (des)=>{return {
                                                                            value: {id: des.routeId, turn: des.round},
                                                                            label: des.destination.name
                                                                        }}))
                                                        :[]}
                                value={destinatePlace}
                                onFocus={checkOrigin}
                                onChange={setDestinatePlace}
                                className={styles.selectItem}
                                placeholder="Destination">
                        </Select>
                    </div>
                </div>

                <div className={styles.headerSearchItem}>
                    <FontAwesomeIcon icon={faCalendarDays} className={styles.headerIcon}/>
                    <div className={styles.selectArea}>
                        <div className={styles.selectTitle}>{t('header.searchbox.depart_date')}</div>
                        <div className={styles.datePicker}>
                            <DatePicker selected={parse(searchInfor.departDate,'dd/MM/yyyy', new Date())}
                                        onChange={chooseOriginDate}
                                        className={styles.headerSearchInput}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Depart Date" />
                        </div>
                    </div>
                </div>

                { searchInfor.oneway === false ?
                    (
                        <div className={styles.headerSearchItem}>
                            <FontAwesomeIcon icon={faCalendarDays} className={styles.headerIcon}/>
                            <div className={styles.selectArea}>
                                <div className={styles.selectTitle}>{t('header.searchbox.return_date')}</div>
                                <div className={styles.datePicker}>
                                    <DatePicker selected={parse(searchInfor.arrivalDate, 'dd/MM/yyyy', new Date())}
                                                onChange={chooseReturnDate}
                                                className={styles.headerSearchInput}
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="Arrival Date"/>
                                </div>
                            </div>
                        </div>
                    ): null
                }
                
                <div className={`${styles.headerSearchItem} ${styles.ticketAmount}`}>
                    <FontAwesomeIcon icon={faTicketSimple} className={styles.headerIcon}/>
                    <div className={styles.selectArea}>
                        <div className={styles.selectTitle}>{t('header.searchbox.ticket_number')}</div>
                        <div className={styles.ticketChange}>  
                            <button className={ styles.optionCounterButton} 
                                                onClick={()=>chooseTicketNumber(-1)}
                                                disabled={searchInfor.numberTicket===1}>
                                <span>-</span>
                            </button>
                            <span className={styles.headerSearchText}>{searchInfor.numberTicket}</span>
                            <button className={ styles.optionCounterButton} 
                                                onClick={()=>chooseTicketNumber(1)} 
                                                disabled={searchInfor.numberTicket===5}>
                                <span>+</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.headerSearchButton}>
                <Button onClick={handleSearch} text={t('header.searchbox.search_btn')} ></Button>
            </div>
        </div>
        </>
    )
}

export default SearchBox