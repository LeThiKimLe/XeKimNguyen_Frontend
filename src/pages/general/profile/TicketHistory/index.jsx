import styles from './styles.module.css'
import { Container, Col, Row } from 'react-bootstrap'
import { DateRangePicker } from 'react-date-range'
import { DateRange } from 'react-date-range'
import { format } from 'date-fns'
import { OptionButton } from '../../../../components/common/button'
import { useState } from 'react'
import Select from 'react-select'
import { ticketHistory } from '../../../../utils/test_data'
import { convertToTime, c } from '../../../../utils/unitUtils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import TicketAction from './TicketAction'
import { ticketAction } from '../../../../feature/ticket/ticket.slice'
import { useDispatch } from 'react-redux'

const TicketHistory = () => {

    const [ticketState, setTicketState] = useState('')
    const [bookingCode, setBookingCode] = useState('')
    const [ticketActionOp, setTicketActionOp] = useState('')
    const [allowAction, setAllowAction] = useState(true)
    const dispatch = useDispatch()

    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date('2023/01/01'),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const stateOptions = [
        { value: 'pending', label: 'Chờ thanh toán' },
        { value: 'cancel', label: 'Bị hủy' },
        { value: 'success', label: 'Thành công' },
    ]

    const ticketActions = [
        { value: 'edit', label: 'Sửa vé' },
        { value: 'change', label: 'Đổi vé' },
        { value: 'cancel', label: 'Hủy vé' },

    ]
    
    const [openDate, setOpenDate] = useState(false)
    const [openAction, setOpenAction] = useState(false)

    const isEvenRow = (index) => {
        return index % 2 === 0;
    };

    const [selectedRow, setSelectedRow] = useState(null);

    const handleRowSelect = (booking) => {
        setSelectedRow(booking);
        dispatch(ticketAction.setCurrentTicket(booking))
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
        if (selectedRow)
        {
            const [day, month, year] = selectedRow.trip.departDate.split('-')
            const targetDate = new Date(year, month - 1, day)
            const today = new Date()

            if (today > targetDate) {
                return false
            } else {
                return true
            }
        }
        return true
    }

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col>
                        <p className={styles.filterTitle}>Mã đặt vé</p>
                        <input type="text" placeholder='Mã vé' className={styles.filterInput} />
                    </Col>
                    <Col>
                        <p className={styles.filterTitle}>Trạng thái</p>
                        <div style={{ width: '100%' }}>
                            <Select options={stateOptions}
                                value={ticketState}
                                onChange={setTicketState}
                                className={styles.selectItem}
                                placeholder="Trạng thái"
                            >
                            </Select>
                        </div>
                    </Col>
                    <Col style={{ position: 'relative' }}>
                        <p className={styles.filterTitle}>Thời gian</p>
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
                { selectedRow!== null &&
                    <Row>
                    <Col>
                        <div className={styles.actionContainer}>
                            <div onClick={validateTime() ? () => setOpenAction(!openAction) : null} className={`${styles.actionBtn} ${selectedRow}  ${validateTime() ? '' : styles.disable}`}>
                                <span styles={{ padding: '0 5px' }}>Hành động</span>
                                <FontAwesomeIcon icon={faCaretDown} />
                            </div>
                            {
                                openAction &&
                                <ul className={styles.actionSelect}>
                                    {
                                        ticketActions.map((action) => (
                                            <li key={action.value} onClick={()=>handleAction(action)}>{action.label}</li>
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
                                    <th>Ngày đi</th>
                                    <th>Tổng tiền</th>
                                    <th>Thanh toán</th>
                                    <th>Trạng thái</th>
                                    <th>Chi tiết</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ticketHistory.map((booking, index) => (
                                    <tr key={booking.code} className={`${isEvenRow(index) ? styles.even : styles.odd} ${selectedRow && selectedRow.code === booking.code ? styles.selected : ''}`} >
                                        <td><input type="radio"
                                            checked={selectedRow ? selectedRow.code === booking.code : false}
                                            onChange={() => handleRowSelect(booking)}
                                        /></td>
                                        <td>{booking.code}</td>
                                        <td>{booking.ticketNumber}</td>
                                        <td>{`${booking.trip.route.departure.name} - ${booking.trip.route.destination.name}`}</td>
                                        <td>{`${convertToTime(booking.trip.departTime)} - ${booking.trip.departDate}`}</td>
                                        <td>{`${(booking.ticketNumber * booking.trip.ticketPrice).toLocaleString()}`}</td>
                                        <td>{booking.transaction.paymentMethod}</td>
                                        <td><span className={styles[booking.status]}>{stateOptions.filter((option) => option.value === booking.status)[0].label}</span></td>
                                        <td><a href='#'><FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Container>
            {ticketActionOp !== '' ? (
                <TicketAction type={ticketActionOp.value} close={()=>setTicketActionOp('')}></TicketAction>
             )
            :null}
        </div>
    )
}

export default TicketHistory