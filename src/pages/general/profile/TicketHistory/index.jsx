import styles from './styles.module.css'
import { Container, Col, Row } from 'react-bootstrap'
import { DateRangePicker } from 'react-date-range'
import { DateRange } from 'react-date-range'
import { format } from 'date-fns'
import { OptionButton } from '../../../../components/common/button'
import { useEffect, useState } from 'react'
import Select from 'react-select'
// import { ticketHistory } from '../../../../utils/test_data'
import { convertToTime, convertToDisplayDate } from '../../../../utils/unitUtils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import TicketAction from './TicketAction'
import { ticketAction } from '../../../../feature/ticket/ticket.slice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { selectUserBookingHistory } from '../../../../feature/booking/booking.slice'
import bookingThunk from '../../../../feature/booking/booking.service'
import { STATE_DICTIONARY } from '../../../../utils/constants'
import DetailTicket from './DetailTicket'

const TicketHistory = () => {

    const ticketHistory = useSelector(selectUserBookingHistory)
    const [ticketActionOp, setTicketActionOp] = useState('')
    const dispatch = useDispatch()
    const [showTicket, setShowTicket] = useState(null)
    const [sortHistory, setSortHistory] = useState([...ticketHistory])
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date('2023/01/01'),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const stateOptions = [
        { value: 'pending', label: 'Giữ chỗ' },
        { value: 'cancel', label: 'Đã hủy' },
        { value: 'success', label: 'Thành công' },
    ]

    const [ticketActions, setTicketActions] = useState([
        { value: 'change', label: 'Đổi vé', active: true },
        { value: 'cancel', label: 'Hủy vé', active: true },
        { value: 'edit', label: 'Sửa vé', active: true }
    ])

    const [openDate, setOpenDate] = useState(false)
    const [openAction, setOpenAction] = useState(false)

    const [searchCode, setSearchCode] = useState('')
    const [searchState, setSearchState] = useState('')
    const [searchSpan, setSearchSpan] = useState('')

    const isEvenRow = (index) => {
        return index % 2 === 0;
    };

    const [selectedRow, setSelectedRow] = useState(null);

    const handleRowSelect = (booking) => {
        setSelectedRow(booking);
        dispatch(ticketAction.setCurrentTicket(booking))
        setOpenAction(false)
    };

    const handleAction = (action) => {
        setOpenAction(false)
        setTicketActionOp(action);
    };

    const resetTicketChoose = () => {
        setSelectedRow(null)
        setTicketActionOp('')
    }

    const validateTime = () => {
        if (selectedRow) {
            return selectedRow.tickets.every((ticket) => {
                const targetDate = new Date(ticket.schedule.departDate + "T" + ticket.schedule.departTime)
                const today = new Date()
                if (today > targetDate) {
                    return false
                } else {
                    return true
                }
            })
        }
    }

    const validateUse = () => {
        if (selectedRow) {
            const state = STATE_DICTIONARY.filter((state) => state.value === selectedRow.status)[0].key
            return state !== 'cancel'
        }
    }

    useEffect(() => {

        const cancelScan = () => {
            return (
                selectedRow.tickets.some((ticket) => ticket.histories.length === 0 ||
                    ticket.state !== 'Đã hủy')
            )
        }

        const changeScan = () => {
            let allTicketsValid = true;
            for (const ticket of selectedRow.tickets) {
                if (ticket.histories.length > 0 && ticket.histories.some(history => history.action === 'Đổi')) {
                    allTicketsValid = false;
                    break;
                }
            }
            return allTicketsValid;
        }

        const editScan = () => {
            const allTicketsValid = selectedRow.tickets.every((ticket) => {
                const targetDate = new Date(ticket.schedule.departDate + "T" + ticket.schedule.departTime);
                const today = new Date();
                return targetDate.getTime() - today.getTime() > (4 * 60 * 60 * 1000);
            });
            return allTicketsValid;
        }

        if (openAction === true) {
            const updateAction = ticketActions.map(item => {
                if (item.value === 'change') {
                    return { ...item, active: changeScan() };
                } else if (item.value === 'cancel') {
                    return { ...item, active: cancelScan() }
                }
                else
                    return { ...item, active: editScan() }
            });
            setTicketActions(updateAction)
        }

    }, [openAction])

    const timeSort = (b, a) => {
        const timeA = new Date(a.bookingDate);
        const timeB = new Date(b.bookingDate);
        return timeA - timeB;
    }

    useEffect(() => {
        dispatch(bookingThunk.getUserHistory())
    }, [])

    useEffect(() => {
        const copyHistory = [...ticketHistory]
        const filter = copyHistory.filter((booking) => booking.code.includes(searchCode))
        setSortHistory(filter.sort(timeSort))

    }, [searchCode])

    useEffect(() => {
        const copyHistory = [...ticketHistory]
        setSortHistory(copyHistory.sort(timeSort))
    }, [ticketHistory])

    useEffect(() => {
        const copyHistory = [...ticketHistory]
        if (searchState) {
            setSortHistory(copyHistory.filter((booking) => booking.status === searchState.label)
                .sort(timeSort))
        }
        else
            setSortHistory(copyHistory.sort(timeSort))
    }, [searchState])

    useEffect(() => {
        const copyHistory = [...ticketHistory]
        const filter = copyHistory.filter((booking) => new Date(booking.bookingDate) >= dateRange[0].startDate
            && new Date(booking.bookingDate) <= dateRange[0].endDate)
        setSortHistory(filter.sort(timeSort))
    }, [dateRange])

    console.log(ticketHistory)

    return (
        <div>
            {showTicket && <DetailTicket booking={showTicket} onClose={() => setShowTicket(null)}></DetailTicket>}
            <Container fluid>
                <Row>
                    <Col>
                        <p className={styles.filterTitle}>Mã đặt vé</p>
                        <input type="text"
                            placeholder='Mã vé'
                            className={styles.filterInput}
                            value={searchCode}
                            onChange={(e) => setSearchCode(e.target.value)} />
                    </Col>
                    <Col>
                        <p className={styles.filterTitle}>Trạng thái</p>
                        <div style={{ width: '100%' }}>
                            <Select options={stateOptions}
                                value={searchState}
                                onChange={setSearchState}
                                className={styles.selectItem}
                                placeholder="Trạng thái"
                                isClearable={true}
                            >
                            </Select>
                        </div>
                    </Col>
                    <Col style={{ position: 'relative' }}>
                        <p className={styles.filterTitle}>Thời gian đặt vé</p>
                        <input type="text"
                            value={`${format(dateRange[0].startDate, 'dd/MM/yyyy')} - ${format(dateRange[0].endDate, 'dd/MM/yyyy')}`}
                            onClick={() => setOpenDate(!openDate)}
                            readOnly
                            className={styles.filterInput}
                        />
                        {
                            openDate &&
                            <div style={{ position: 'absolute', zIndex: 2 }}>
                                <DateRange
                                    editableDateInputs={true}
                                    onChange={item => setDateRange([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={dateRange}
                                />
                            </div>
                        }
                    </Col>
                </Row>
                {selectedRow !== null &&
                    <Row>
                        <Col>
                            <div className={styles.actionContainer}>
                                <div onClick={validateTime() && validateUse() ? () => setOpenAction(!openAction) : null}
                                    className={`${styles.actionBtn} ${selectedRow}  ${validateTime() && validateUse() ? '' : styles.disable}`}>
                                    <span styles={{ padding: '0 5px' }}>Hành động</span>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </div>
                                {
                                    openAction &&
                                    <ul className={styles.actionSelect}>
                                        {
                                            ticketActions.map((action) => (
                                                <li key={action.value}
                                                    onClick={action.active === true ? () => handleAction(action) : null}
                                                    className={action.active === false ? styles.disable : ''} >
                                                    {action.label}
                                                </li>
                                            ))
                                        }
                                    </ul>
                                }
                                <i onClick={resetTicketChoose}>Bỏ chọn</i>
                            </div>

                        </Col>
                    </Row>
                }
                <Row style={{ margin: '20px 0' }}>
                    <Col className={styles.historyContainer}>
                        <table className={styles.tableHistory}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Mã đặt vé</th>
                                    <th>Số vé</th>
                                    <th>Tuyến đường</th>
                                    <th>Ngày đặt vé</th>
                                    <th>Tổng tiền</th>
                                    <th>Thanh toán</th>
                                    <th>Trạng thái</th>
                                    <th>Chi tiết</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortHistory.map((booking, index) => (
                                    <tr key={booking.code} className={`${isEvenRow(index) ? styles.even : styles.odd} ${selectedRow && selectedRow.code === booking.code ? styles.selected : ''}`} >
                                        <td><input type="radio"
                                            checked={selectedRow ? selectedRow.code === booking.code : false}
                                            onChange={() => handleRowSelect(booking)}
                                        /></td>
                                        <td>{booking.code}</td>
                                        <td>{booking.ticketNumber}</td>
                                        {booking.trip.turn === true ? (
                                            <td>{`${booking.trip.startStation.name} - ${booking.trip.endStation.name}`}</td>
                                        ) : (
                                            <td>{`${booking.trip.endStation.name} - ${booking.trip.startStation.name}`}</td>
                                        )}
                                        <td>{format(new Date(booking.bookingDate), 'HH:mm dd/MM/yyyy')}</td>
                                        {booking.transaction ? (
                                            <>
                                                <td>{`${(booking.transaction.amount).toLocaleString()} đ`}</td>
                                                <td>{booking.transaction.paymentMethod}</td>
                                            </>
                                        ) : (
                                            <>
                                                <td>---</td>
                                                {
                                                    booking.status === 'Đã hủy' ? (
                                                        <td>---</td>
                                                    ) : (
                                                        <td><a href={`/payment/${booking.code}`}>Thanh toán ngay</a></td>
                                                    )
                                                }
                                            </>
                                        )}
                                        <td><span className={styles[STATE_DICTIONARY.filter((state) => state.value === booking.status)[0].key]}>{booking.status}</span></td>
                                        <td><a href='#' onClick={() => setShowTicket(booking)} ><FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Container>
            {ticketActionOp !== '' ? (
                <TicketAction type={ticketActionOp.value} close={() => setTicketActionOp('')}></TicketAction>
            )
                : null}
        </div>
    )
}

export default TicketHistory