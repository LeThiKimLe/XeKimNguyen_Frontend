import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser, faClockRotateLeft, faUnlockKeyhole, faRightToBracket, faUser } from "@fortawesome/free-solid-svg-icons"

export const PROFILE_ACTION = [
    {
        title: 'Thông tin tài khoản',
        index: 1,
        roles: [1,2,3,4],
        name: 'account-infor',
        navigate: true,
        icon: faCircleUser,
        subDescription: 'Chỉnh sửa các thông tin cá nhân'
    },
    {
        title: 'Lịch sử đặt vé',
        index: 2,
        roles: [1],
        name: 'ticket-history',
        navigate: true,
        icon: faClockRotateLeft,
        subDescription: 'Xem lại lịch sử đặt vé'
    },
    {
        title: 'Đổi mật khẩu',
        index: 3,
        roles: [1,2,3,4],
        name: 'change-password',
        navigate: true,
        icon: faUnlockKeyhole,
        subDescription: 'Đổi mật khẩu đăng nhập tài khoản'

    },

    {
        title: 'Đăng xuất',
        index: 4,
        roles: [1,2,3,4],
        name: 'logout',
        navigate: false,
        icon: faRightToBracket,
        subDescription: 'Đăng xuất khỏi phiên làm việc'
    },
]

export const GENDER_OPTION = [
    {
        value: 1,
        label: 'Nữ'
    },
    {
        value: 0,
        label: 'Nam'                        
    }
]