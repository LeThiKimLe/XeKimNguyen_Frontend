export const ROUTE_DATA =
    [
        {
            id: 1,
            distance: 133,
            departure: {
                id: 1,
                name: "TP. Hồ Chí Minh"
            },
            destination: {
                id: 2,
                name: "Trà Vinh"
            },
            price: 130000,
            schedule: "TP.HCM -> Long An -> Tiền Giang -> Bến Tre -> Trà Vinh",
            parents: null,
            hours: 4.5
        },
        {
            id: 2,
            distance: 100,
            departure: {
                id: 1,
                name: "TP. Hồ Chí Minh"
            },
            destination: {
                id: 3,
                name: "Bến Tre"
            },
            price: 100000,
            schedule: "TP.HCM -> Long An -> Tiền Giang -> Bến Tre",
            parents: 1,
            hours: 2.2
        },
        {
            id: 3,
            distance: 95,
            departure: {
                id: 1,
                name: "TP. Hồ Chí Minh"
            },
            destination: {
                id: 11,
                name: "Vũng Tàu"
            },
            price: 80000,
            schedule: "TP.HCM -> Cầu Đồng Nai -> Quốc lộ 51 -> Vũng Tàu",
            parents: null,
            hours: 3.5
        },
        {
            id: 4,
            distance: 350,
            departure: {
                id: 1,
                name: "TP. Hồ Chí Minh"
            },
            destination: {
                id: 4,
                name: "Cam Ranh"
            },
            price: 250000,
            schedule: "TP.HCM -> Đồng Nai -> Bình Thuận -> Ninh Thuận -> Cam Ranh",
            parents: 5,
            hours: 8.1
        },
        {
            id: 5,
            distance: 427,
            departure: {
                id: 1,
                name: "TP. Hồ Chí Minh"
            },
            destination: {
                id: 5,
                name: "Nha Trang"
            },
            price: 275000,
            schedule: "TP.HCM -> Đồng Nai -> Bình Thuận -> Ninh Thuận -> Cam Ranh -> Nha Trang",
            parents: 6,
            hours: 11
        },
        {
            id: 6,
            distance: 535,
            departure: {
                id: 1,
                name: "TP. Hồ Chí Minh"
            },
            destination: {
                id: 6,
                name: "Phú Yên"
            },
            price: 325000,
            schedule: "TP.HCM -> Đồng Nai -> Bình Thuận -> Ninh Thuận -> Khánh Hòa -> Phú Yên",
            parents: 7,
            hours: 12
        },
        {
            id: 7,
            distance: 585,
            departure: {
                id: 1,
                name: "TP. Hồ Chí Minh"
            },
            destination: {
                id: 7,
                name: "Bình Định"
            },
            price: 375000,
            schedule: "TP.HCM -> Đồng Nai -> Bình Thuận -> Ninh Thuận -> Khánh Hòa -> Phú Yên -> Bình Định",
            parents: 8,
            hours: 14.3
        },
        {
            id: 8,
            distance: 757,
            departure: {
                id: 1,
                name: "TP. Hồ Chí Minh"
            },
            destination: {
                id: 8,
                name: "Quảng Ngãi"
            },
            price: 400000,
            schedule: "TP.HCM -> Đồng Nai -> Bình Thuận -> Ninh Thuận -> Khánh Hòa -> Phú Yên -> Bình Định -> Quãng Ngãi",
            parents: null,
            hours: 18
        },
        {
            id: 9,
            distance: 980,
            departure: {
                id: 1,
                name: "TP. Hồ Chí Minh"
            },
            destination: {
                id: 9,
                name: "Đà Nẵng"
            },
            price: 450000,
            schedule: "TP.HCM -> Đồng Nai -> Bình Thuận -> Ninh Thuận -> Khánh Hòa -> Quãng Ngãi -> Quảng Nam -> Đà Nẵng",
            parents: null,
            hours: 18
        },
        {
            id: 10,
            distance: 310,
            departure: {
                id: 1,
                name: "TP. Hồ Chí Minh"
            },
            destination: {
                id: 10,
                name: "Đà Lạt"
            },
            price: 225000,
            schedule: "TP.HCM -> cầu Sài Gòn -> xa lộ Hà Nội -> ngã tư Vũng Tàu -> đường Võ Nguyên Giáp -> quốc lộ 1 -> ngã ba Dầu Giây -> quốc lộ 20 -> Lâm Đồng -> Đà Lạt",
            parents: null,
            hours: 8
        },
        {
            id: 11,
            distance: 568,
            departure: {
                id: 9,
                name: "Đà Nẵng"
            },
            destination: {
                id: 4,
                name: "Cam Ranh"
            },
            price: 300000,
            schedule: "Đà Nẵng -> Quảng Nam -> Quảng Ngãi -> Bình Định -> Phú Yên -> Nha Trang -> Cam Ranh",
            parents: null,
            hours: 10
        },
        {
            id: 12,
            distance: 666,
            departure: {
                id: 9,
                name: "Đà Nẵng"
            },
            destination: {
                id: 10,
                name: "Đà Lạt"
            },
            price: 450000,
            schedule: "Đại Lộc -> Vĩnh Điện -> Tam Kỳ -> Quãng Nam -> Quãng Ngãi -> Quy Nhơn -> Tuy Hòa -> Ninh Hòa -> Đà Lạt",
            parents: null,
            hours: 17
        },
        {
            id: 13,
            distance: 528,
            departure: {
                id: 9,
                name: "Đà Nẵng"
            },
            destination: {
                id: 5,
                name: "Nha Trang"
            },
            price: 275000,
            schedule: "Đà Nẵng -> Quảng Nam -> Quảng Ngãi -> Bình Định -> Phú Yên -> Nha Trang",
            parents: 11,
            hours: 9.3
        }
    ]

const listDeparture = []
const listDestination = []
const routeData = ROUTE_DATA

export const createListRoutes = () => {
    routeData.forEach((route) => {
        addRoute(route, 'forward')
        addRoute(route, 'backward')
    })
    return {
        listDeparture: listDeparture,
        listDestination: listDestination
    }
}

const addRoute = (route, round) => {

    const roundkey = round === 'forward' ? 1 : 0

    const cusRoute = roundkey === 1 ? route : {
        ...route,
        departure: route.destination,
        destination: route.departure
    }

    const addKeyPair = () => {
        const key = listDeparture.length
        listDeparture.push({
            key: key,
            location: cusRoute.departure
        })
        listDestination.push({
            key: key,
            location: [
                {
                    destination: cusRoute.destination,
                    routeId: cusRoute.id,
                    round: roundkey
                }
            ]
        })
    }

    if (listDeparture.length !== 0) {
        const findKey = listDeparture.filter((depart) => depart.location.id === cusRoute.departure.id)[0]
        if (findKey) {
            const key = findKey.key
            const mapDesIndex = listDestination.indexOf(listDestination.filter((des) => des.key === key)[0])
            {
                if (!(listDestination[mapDesIndex].location.map((local) => local.destination.id).includes(cusRoute.destination.id))) {
                    listDestination[mapDesIndex].location.push({
                        destination: cusRoute.destination,
                        routeId: cusRoute.id,
                        round: roundkey
                    })
                }
            }
        }
        else {
            addKeyPair()
        }
    }
    else {
        addKeyPair()
    }
}

export const BOOKING_INFOR = {
    code: 'VAZ5UY',
    status: 'success',
    message: 'Vé được đặt thành công',
    ticketNumber: 2,
    route: {
        id: 12,
        distance: 666,
        departure: {
            id: 9,
            name: "Đà Nẵng"
        },
        destination: {
            id: 10,
            name: "Đà Lạt"
        },
        price: 450000,
        schedule: "Đại Lộc -> Vĩnh Điện -> Tam Kỳ -> Quãng Nam -> Quãng Ngãi -> Quy Nhơn -> Tuy Hòa -> Ninh Hòa -> Đà Lạt",
        parents: null,
        hours: 17
    },
    trip: {
        id: 1,
        departDate: '20-12-2023',
        departTime: '18h',
        ticketPrice: 250000,
    },
    user: {
        id: 1232,
        name: 'Kim Lệ',
        tel: '0909090909',
        email: '123@gmail.com',
    },
    pickPoint: {
        id: 17,
        name: 'Bến xe Miền Đông'
    },
    transaction: {
        id: '12345678',
        transaction_type: 'Thanh toán',
        amount: 500000,
        paymentMethod: 'MoMo',
        paymentTime: '19:16:29 10-10-2023',
        status: 'Thành công'
    },
    tickets: [
        {
            code: '930958230583',
            seat: 'A3',
            billCode: '249873598347',
        },
        {
            code: '930958230584',
            seat: 'A5',
            billCode: '249873598348',
        },
        {
            code: '930958230585',
            seat: 'A7',
            billCode: '249873598349',
        }
    ],
    bus: {
        id: 123,
        licensePlate: '51C-78971'
    }
}

export const BILL_TEST_DATA = {
    code: '930958230584',
    seat: 'A5',
    billCode: '249873598348',
    booking: {
        bookingDate: '20-10-2023',
        route: {
            id: 12,
            distance: 666,
            departure: {
                id: 9,
                name: "Đà Nẵng"
            },
            destination: {
                id: 10,
                name: "Đà Lạt"
            },
            price: 450000,
            schedule: "Đại Lộc -> Vĩnh Điện -> Tam Kỳ -> Quãng Nam -> Quãng Ngãi -> Quy Nhơn -> Tuy Hòa -> Ninh Hòa -> Đà Lạt",
            parents: null,
            hours: 17
        },
        trip: {
            id: 1,
            departDate: '20-12-2023',
            departTime: '18h',
            ticketPrice: 250000,
        },
        user: {
            id: 1232,
            name: 'Kim Lệ',
            tel: '0909090909',
            email: '123@gmail.com',
        },
        transaction: {
            id: '12345678',
            transaction_type: 'Thanh toán',
            amount: 500000,
            paymentMethod: 'MoMo',
            paymentTime: '19:16:29 10-10-2023',
            status: 'Thành công'
        },
        bus: {
            id: 123,
            licensePlate: '51C-78971'
        }
    }
}

export const COMMENT_LIST = [
    {
        id: 1,
        rate: 4,
        comment: "Tài xế lái rất lụa, lạng lách tốt",
        state: "Duyệt",
        trip: {
            departDate: '20-10-2023',
            departTime: '18h',
            route: {
                departure: {
                    name: "Đà Nẵng"
                },
                destination: {
                    name: "TP. Hồ Chí Minh"
                }
            }
        },
        reviewer: {
            name: 'Lê Trung Nguyên',
            gender: true
        },
        sendDate: '21-10-2023'
    },
    {
        id: 2,
        rate: 5,
        comment: "Từ chỗ nhà chờ mình có được cho ghế ngồi đợi. Xe mới, sạch sẽ, tốt, không có mùi xe cũ, có bánh nước, giường 2 người bằng kích cỡ giường cũ nhưng bỏ cái kệ bên cạnh ra, nằm một mình rất thoải mái, chăn gối cũng ok. Xe theo lịch rời bến muộn nhất lúc 11h nhưng 10h50 đã đi làm mình không kịp nhận đồ gửi. Vẫn là theo lịch 8h mới về tới nhà nhưng 6h mình đã tới nơi.",
        state: "Duyệt",
        trip: {
            departDate: '20-10-2023',
            departTime: '18h',
            route: {
                departure: {
                    name: "Đà Nẵng"
                },
                destination: {
                    name: "TP. Hồ Chí Minh"
                }
            }
        },
        reviewer: {
            name: 'Lê Trung Nguyên',
            gender: false
        },
        sendDate: '21-10-2023'
    },
    {
        id: 3,
        rate: 2,
        comment: "Từ chỗ nhà chờ mình có được cho ghế ngồi đợi. Xe mới, sạch sẽ, tốt, không có mùi xe cũ, có bánh nước, giường 2 người bằng kích cỡ giường cũ nhưng bỏ cái kệ bên cạnh ra, nằm một mình rất thoải mái, chăn gối cũng ok.",
        state: "Duyệt",
        trip: {
            departDate: '20-10-2023',
            departTime: '18h',
            route: {
                departure: {
                    name: "Đà Nẵng"
                },
                destination: {
                    name: "TP. Hồ Chí Minh"
                }
            }
        },
        reviewer: {
            name: 'Lê Trung Nguyên',
            gender: true
        },
        sendDate: '21-10-2023'
    },
    {
        id: 4,
        rate: 4,
        comment: "Tài xế lái rất lụa, lạng lách tốt. Từ chỗ nhà chờ mình có được cho ghế ngồi đợi. Xe mới, sạch sẽ, tốt, không có mùi xe cũ, có bánh nước, giường 2 người bằng kích cỡ giường cũ nhưng bỏ cái kệ bên cạnh ra, nằm một mình rất thoải mái.",
        state: "Duyệt",
        trip: {
            departDate: '20-10-2023',
            departTime: '18h',
            route: {
                departure: {
                    name: "Đà Nẵng"
                },
                destination: {
                    name: "TP. Hồ Chí Minh"
                }
            }
        },
        reviewer: {
            name: 'Lê Trung Nguyên',
            gender: true
        },
        sendDate: '21-10-2023'
    },
    {
        id: 5,
        rate: 4,
        comment: "Tài xế lái rất lụa, lạng lách tốt",
        state: "Duyệt",
        trip: {
            departDate: '20-10-2023',
            departTime: '18h',
            route: {
                departure: {
                    name: "Đà Nẵng"
                },
                destination: {
                    name: "TP. Hồ Chí Minh"
                }
            }
        },
        reviewer: {
            name: 'Lê Trung Nguyên',
            gender: false
        },
        sendDate: '21-10-2023'
    },
    {
        id: 6,
        rate: 4,
        comment: "Tài xế lái rất lụa, lạng lách tốt",
        state: "Duyệt",
        trip: {
            departDate: '20-10-2023',
            departTime: '18h',
            route: {
                departure: {
                    name: "Đà Nẵng"
                },
                destination: {
                    name: "TP. Hồ Chí Minh"
                }
            }
        },
        reviewer: {
            name: 'Lê Trung Nguyên',
            gender: false
        },
        sendDate: '21-10-2023'
    },
    {
        id: 7,
        rate: 4,
        comment: "Tài xế lái rất lụa, lạng lách tốt",
        state: "Duyệt",
        trip: {
            departDate: '20-10-2023',
            departTime: '18h',
            route: {
                departure: {
                    name: "Đà Nẵng"
                },
                destination: {
                    name: "TP. Hồ Chí Minh"
                }
            }
        },
        reviewer: {
            name: 'Lê Trung Nguyên',
            gender: false
        },
        sendDate: '21-10-2023'
    },
    {
        id: 8,
        rate: 4,
        comment: "Tài xế lái rất lụa, lạng lách tốt",
        state: "Duyệt",
        trip: {
            departDate: '20-10-2023',
            departTime: '18h',
            route: {
                departure: {
                    name: "Đà Nẵng"
                },
                destination: {
                    name: "TP. Hồ Chí Minh"
                }
            }
        },
        reviewer: {
            name: 'Lê Trung Nguyên',
            gender: false
        },
        sendDate: '21-10-2023'
    },
    {
        id: 9,
        rate: 4,
        comment: "Tài xế lái rất lụa, lạng lách tốt",
        state: "Duyệt",
        trip: {
            departDate: '20-10-2023',
            departTime: '18h',
            route: {
                departure: {
                    name: "Đà Nẵng"
                },
                destination: {
                    name: "TP. Hồ Chí Minh"
                }
            }
        },
        reviewer: {
            name: 'Lê Trung Nguyên',
            gender: false
        },
        sendDate: '21-10-2023'
    },
    {
        id: 10,
        rate: 4,
        comment: "Tài xế lái rất lụa, lạng lách tốt",
        state: "Duyệt",
        trip: {
            departDate: '20-10-2023',
            departTime: '18h',
            route: {
                departure: {
                    name: "Đà Nẵng"
                },
                destination: {
                    name: "TP. Hồ Chí Minh"
                }
            }
        },
        reviewer: {
            name: 'Lê Trung Nguyên',
            gender: false
        },
        sendDate: '21-10-2023'
    }
]


export const TRIP_DATA = [
    {
        id: 1,
        departTime: 18,
        departDate: '20-10-2020',
        ticketPrice: 200000,
        availability: 20,
        turn: 1,
        note: 'Xe có lộ trình đi cao tốc',
        startStation: {
            id: 1,
            name: 'Bến xe Miền Đông mới'
        },
        endStation: {
            id: 2,
            name: 'Bến xe Cam Ranh'
        },
        route: {
            id: 4,
            departute: {
                id: 1,
                name: "TPHCM"
            },
            destination: {
                id: 4,
                name: 'Cam Ranh'
            },
            hours: 9,
            distance: 189
        },
        bookedSeat : ['A1', 'A3', 'A5', 'B7']
    },
    {
        id: 2,
        departTime: 9,
        departDate: '20-10-2020',
        ticketPrice: 200000,
        availability: 30,
        turn: 1,
        note: 'Xe có lộ trình đi cao tốc',
        startStation: {
            id: 1,
            name: 'Bến xe Miền Đông Tây'
        },
        endStation: {
            id: 2,
            name: 'Bến xe Cam Ranh'
        },
        route: {
            id: 5,
            departute: {
                id: 1,
                name: "TPHCM"
            },
            destination: {
                id: 5,
                name: 'Nha Trang'
            },
            hours: 11,
            distance: 250
        },
        bookedSeat : ['A1', 'A3', 'A5', 'B7', 'A6', 'B8', 'B9']
    },
    {
        id: 3,
        departTime: 15.5,
        departDate: '20-10-2020',
        ticketPrice: 200000,
        availability: 20,
        turn: 1,
        note: 'Xe có lộ trình đi cao tốc',
        startStation: {
            id: 1,
            name: 'Bến xe Miền Đông mới'
        },
        endStation: {
            id: 2,
            name: 'Bến xe Cam Ranh'
        },
        route: {
            id: 4,
            departute: {
                id: 1,
                name: "TPHCM"
            },
            destination: {
                id: 4,
                name: 'Cam Ranh'
            },
            hours: 9,
            distance: 189
        },
        bookedSeat : ['A1', 'A3', 'A5', 'B7']
    },
    {
        id: 4,
        departTime: 23,
        departDate: '20-10-2020',
        ticketPrice: 245000,
        availability: 20,
        turn: 1,
        note: 'Xe có lộ trình đi cao tốc',
        startStation: {
            id: 1,
            name: 'Bến xe Miền Đông mới'
        },
        endStation: {
            id: 2,
            name: 'Bến xe Miền Nam Nha Trang'
        },
        route: {
            id: 5,
            departute: {
                id: 1,
                name: "TPHCM"
            },
            destination: {
                id: 5,
                name: 'Nha Trang'
            },
            hours: 11,
            distance: 189
        },
        bookedSeat : ['A1', 'A3', 'A5', 'B7']
    },
    {
        id: 5,
        departTime: 18,
        departDate: '20-10-2020',
        ticketPrice: 200000,
        availability: 20,
        turn: 1,
        note: 'Xe có lộ trình đi cao tốc',
        startStation: {
            id: 1,
            name: 'Bến xe Miền Đông mới'
        },
        endStation: {
            id: 2,
            name: 'Bến xe Nha Trang'
        },
        route: {
            id: 5,
            departute: {
                id: 1,
                name: "TPHCM"
            },
            destination: {
                id: 5,
                name: 'Nha Trang'
            },
            hours: 11,
            distance: 189
        },
        bookedSeat : ['A1', 'A3', 'A5', 'B7']
    },
    {
        id: 6,
        departTime: 7,
        departDate: '20-10-2020',
        ticketPrice: 200000,
        availability: 20,
        turn: 1,
        note: 'Xe có lộ trình đi cao tốc',
        startStation: {
            id: 1,
            name: 'Bến xe Miền Đông mới'
        },
        endStation: {
            id: 2,
            name: 'Bến xe Cam Ranh'
        },
        route: {
            id: 4,
            departute: {
                id: 1,
                name: "TPHCM"
            },
            destination: {
                id: 2,
                name: 'Cam Ranh'
            },
            hours: 9,
            distance: 189
        },
        bookedSeat : ['A1', 'A3', 'A5', 'B7']
    },
    {
        id: 7,
        departTime: 12,
        departDate: '20-10-2020',
        ticketPrice: 200000,
        availability: 20,
        turn: 1,
        note: 'Xe có lộ trình đi cao tốc',
        startStation: {
            id: 1,
            name: 'Bến xe Miền Đông mới'
        },
        endStation: {
            id: 2,
            name: 'Bến xe Cam Ranh'
        },
        route: {
            id: 4,
            departute: {
                id: 1,
                name: "TPHCM"
            },
            destination: {
                id: 2,
                name: 'Cam Ranh'
            },
            hours: 9,
            distance: 189
        },
        bookedSeat : ['A1', 'A3', 'A5', 'B7']
    },
]