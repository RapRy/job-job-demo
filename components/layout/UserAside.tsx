import React, { useEffect } from 'react'
import { useNavigationStore } from '@/store/store'

const mdQuery = '(max-width: 768px)'

const UserAside = () => {
    const { showSideBar, setShowSideBar } = useNavigationStore()

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
    <aside className={`bg-gray-50 w-64 h-screen relative top-[-73px] left-0 ${showSideBar ? "block" : "hidden"}`}>
        <div className='pt-24'>
            <ul>
                <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                </li>
                <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Calendar</a>
                </li>
                <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</a>
                </li>
                <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Applications</a>
                </li>
                <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Contacts</a>
                </li>
                <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Feeds</a>
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