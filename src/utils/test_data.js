export const ROUTE_DATA =
    [
        {
            id : 1,
            distance : 133,
            departure : {
                id: 1,
                name: "TP. Hồ Chí Minh"
            },
            destination : {
                id: 2,
                name: "Trà Vinh"
            },
            price : 130000,
            schedule : "TP.HCM -> Long An -> Tiền Giang -> Bến Tre -> Trà Vinh",
            parents : null,
            hours : 4.5
        },
        {
            id : 2,
            distance : 100,
            departure : {
                id: 1,
                name: "TP. Hồ Chí Minh"
            },
            destination : {
                id: 3,
                name: "Bến Tre"
            },
            price : 100000,
            schedule : "TP.HCM -> Long An -> Tiền Giang -> Bến Tre",
            parents : 1,
            hours : 2.2
        },
        {
            id : 3,
            distance : 95,
            departure : {
                id: 1,
                name: "TP. Hồ Chí Minh"
            },
            destination : {
                id: 11,
                name: "Vũng Tàu"
            },
            price : 80000,
            schedule : "TP.HCM -> Cầu Đồng Nai -> Quốc lộ 51 -> Vũng Tàu",
            parents : null,
            hours : 3.5
        },
        {
            id : 4,
            distance : 350,
            departure : {
                id: 1,
                name: "TP. Hồ Chí Minh"
            },
            destination : {
                id: 4,
                name: "Cam Ranh"
            },
            price : 250000,
            schedule : "TP.HCM -> Đồng Nai -> Bình Thuận -> Ninh Thuận -> Cam Ranh",
            parents : 5,
            hours : 8.1
        },
        {
            id : 5,
            distance : 427,
            departure : {
                id: 1,
                name: "TP. Hồ Chí Minh"
            },
            destination : {
                id: 5,
                name: "Nha Trang"
            },
            price : 275000,
            schedule : "TP.HCM -> Đồng Nai -> Bình Thuận -> Ninh Thuận -> Cam Ranh -> Nha Trang",
            parents : 6,
            hours : 11
        },
        {
            id : 6,
            distance : 535,
            departure : {
                id: 1,
                name: "TP. Hồ Chí Minh"
            },
            destination : {
                id: 6,
                name: "Phú Yên"
            },
            price : 325000,
            schedule : "TP.HCM -> Đồng Nai -> Bình Thuận -> Ninh Thuận -> Khánh Hòa -> Phú Yên",
            parents : 7,
            hours : 12
        },
        {
            id : 7,
            distance : 585,
            departure : {
                id: 1,
                name: "TP. Hồ Chí Minh"
            },
            destination : {
                id: 7,
                name: "Bình Định"
            },
            price : 375000,
            schedule : "TP.HCM -> Đồng Nai -> Bình Thuận -> Ninh Thuận -> Khánh Hòa -> Phú Yên -> Bình Định",
            parents : 8,
            hours : 14.3
        },
        {
            id : 8,
            distance : 757,
            departure : {
                id: 1,
                name: "TP. Hồ Chí Minh"
            },
            destination : {
                id: 8,
                name: "Quảng Ngãi"
            },
            price : 400000,
            schedule : "TP.HCM -> Đồng Nai -> Bình Thuận -> Ninh Thuận -> Khánh Hòa -> Phú Yên -> Bình Định -> Quãng Ngãi",
            parents : null,
            hours : 18
        },
        {
            id : 9,
            distance : 980,
            departure : {
                id: 1,
                name: "TP. Hồ Chí Minh"
            },
            destination : {
                id: 9,
                name: "Đà Nẵng"
            },
            price : 450000,
            schedule : "TP.HCM -> Đồng Nai -> Bình Thuận -> Ninh Thuận -> Khánh Hòa -> Quãng Ngãi -> Quảng Nam -> Đà Nẵng",
            parents : null,
            hours : 18
        },
        {
            id : 10,
            distance : 310,
            departure : {
                id: 1,
                name: "TP. Hồ Chí Minh"
            },
            destination : {
                id: 10,
                name: "Đà Lạt"
            },
            price : 225000,
            schedule : "TP.HCM -> cầu Sài Gòn -> xa lộ Hà Nội -> ngã tư Vũng Tàu -> đường Võ Nguyên Giáp -> quốc lộ 1 -> ngã ba Dầu Giây -> quốc lộ 20 -> Lâm Đồng -> Đà Lạt",
            parents : null,
            hours : 8
        },
        {
            id : 11,
            distance : 568,
            departure : {
                id: 9,
                name: "Đà Nẵng"
            },
            destination : {
                id: 4,
                name: "Cam Ranh"
            },
            price : 300000,
            schedule : "Đà Nẵng -> Quảng Nam -> Quảng Ngãi -> Bình Định -> Phú Yên -> Nha Trang -> Cam Ranh",
            parents : null,
            hours : 10
        },
        {
            id : 12,
            distance : 666,
            departure : {
                id: 9,
                name: "Đà Nẵng"
            },
            destination : {
                id: 10,
                name: "Đà Lạt"
            },
            price : 450000,
            schedule : "Đại Lộc -> Vĩnh Điện -> Tam Kỳ -> Quãng Nam -> Quãng Ngãi -> Quy Nhơn -> Tuy Hòa -> Ninh Hòa -> Đà Lạt",
            parents : null,
            hours : 17
        },
        {
            id : 13,
            distance : 528,
            departure : {
                id: 9,
                name: "Đà Nẵng"
            },
            destination : {
                id: 5,
                name: "Nha Trang"
            },
            price : 275000,
            schedule : "Đà Nẵng -> Quảng Nam -> Quảng Ngãi -> Bình Định -> Phú Yên -> Nha Trang",
            parents : 11,
            hours : 9.3
        }
    ]

    const listDeparture = []
    const listDestination = []
    const routeData=ROUTE_DATA

export const createListRoutes = () => {
        routeData.forEach((route) => {
            addRoute(route, 'forward')
            addRoute(route, 'backward')
        })
        return {listDeparture: listDeparture,
                listDestination: listDestination}
    }

    const addRoute = (route, round) => {
        
        const roundkey = round==='forward' ? 1 : 0

        const cusRoute = roundkey===1 ? route : {
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

        if (listDeparture.length!==0)
        {
            const findKey = listDeparture.filter((depart)=>depart.location.id === cusRoute.departure.id)[0]
            if (findKey)
            {
                const key = findKey.key
                const mapDesIndex = listDestination.indexOf(listDestination.filter((des)=>des.key === key)[0])
                {
                    if (!(listDestination[mapDesIndex].location.map((local)=>local.destination.id).includes(cusRoute.destination.id)))
                    {
                        listDestination[mapDesIndex].location.push({
                            destination: cusRoute.destination,
                            routeId: cusRoute.id,
                            round: roundkey
                        })
                    }    
                }
            }
            else{
                addKeyPair()
            }
        }
        else{
            addKeyPair()
        }
    }

    
