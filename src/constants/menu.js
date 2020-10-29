import {
    Home,
    Box,
    UserPlus,
    Settings,
    ShoppingCart
} from 'react-feather';

export const MENUITEMS = [
    // {
    //     path: '/', title: 'Tableau de bord', icon: Home, type: 'link', badgeType: 'primary', active: false
    // },
    {
        path: '/commandes', title: 'Commandes', icon: ShoppingCart, type: 'link', badgeType: 'primary', active: false
    },
    {
        path: '/articles', title: 'Articles', icon: Box, type: 'link', badgeType: 'primary', active: false
    },
    {
        path: '/admins', title: 'Admins', icon: UserPlus, type: 'link', badgeType: 'primary', active: false
    },
    {
        path: '/couturiers', title: 'Couturiers', icon: UserPlus, type: 'link', badgeType: 'primary', active: false
    },
    {
        path: '/coursiers', title: 'Courtiers', icon: UserPlus, type: 'link', badgeType: 'primary', active: false
    },
    {
        path: '/profil', title: 'Mon profil', icon: Settings, type: 'link', badgeType: 'primary', active: false
    },
]
