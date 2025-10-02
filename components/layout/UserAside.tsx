import React, { useEffect } from 'react'
import { useNavigationStore, useUserStore } from '@/store/store'
import Link from 'next/link'
import { hypenizedLowerCased } from '@/lib/helpers'
import { applicationsRoute, calendarRoute, contactsRoute, feedsRoute, profileRoute } from '@/lib/constants'

const mdQuery = '(max-width: 768px)'

const UserAside = () => {
    const { showSideBar, setShowSideBar } = useNavigationStore()
    const { user } = useUserStore()
    const userLink: string = user ? `/${hypenizedLowerCased(user.name.first)}` : "/"


    const handleChange = (event: MediaQueryListEvent) => {
        setShowSideBar(!event.matches);

    };

    useEffect(() => {
        const mediaQueryList = window.matchMedia(mdQuery);
        if (typeof window !== 'undefined') {
            setShowSideBar(!mediaQueryList.matches);

            mediaQueryList.addEventListener('change', handleChange);

        }
        return () => {
            mediaQueryList.removeEventListener('change', handleChange);
        };

    }, [])


  return (
    <aside className={`bg-gray-50 w-64 h-screen transition-[left] duration-500 ease-linear  ${showSideBar ? "relative left-0 top-0" : "fixed -left-64 top-[65px]"}`} aria-hidden={showSideBar}>
        <div className='pt-4'>
            <ul>
                <li>
                    <Link href={userLink} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</Link>
                </li>
                <li>
                    <Link href={`${userLink}${calendarRoute}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Calendar</Link>
                </li>
                <li>
                    <Link href={`${userLink}${profileRoute}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</Link>
                </li>
                <li>
                    <Link href={`${userLink}${applicationsRoute}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Applications</Link>
                </li>
                <li>
                    <Link href={`${userLink}${contactsRoute}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Contacts</Link>
                </li>
                <li>
                    <Link href={`${userLink}${feedsRoute}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Feeds</Link>
                </li>
                <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Log Out</a>
                </li>
            </ul>
        </div>
    </aside>
  )
}

export default UserAside