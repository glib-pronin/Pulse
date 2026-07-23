import { Home, Heart, Search, Plus, UserRound, SunMoon  } from 'lucide-react'

export const NAVIGATION  = [
    {
        icon: Home,
        text: 'Feed',
        to: '/',
        footer: true
    },
    {
        icon: Heart,
        text: 'Following',
        to: '/following',
        footer: true
    },
    {
        icon: Plus,
        text: 'New post',
        type: 'button',
        footer: true
    },
    {
        icon: Search,
        text: 'Search',
        to: '/search',
        footer: true
    },
    {
        icon: UserRound,
        text: 'Profile',
        to: '/profile/test',
        footer: true
    },
    {
        icon: SunMoon,
        text: 'Appearance',
        footer: false
    },
]