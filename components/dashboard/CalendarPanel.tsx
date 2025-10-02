'use client'
import React from 'react'
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';

type Props = {}

interface Event {
  title: string;
  start: Date;
  end: Date;
}

const localizer = dayjsLocalizer(dayjs);

const CalendarPanel = (props: Props) => {
  const events: Event[] = [
      {
        title: 'Meeting',
        start: new Date(2025, 9, 5, 10, 0, 0), // Year, Month (0-indexed), Day, Hour, Minute, Second
        end: new Date(2025, 9, 5, 11, 0, 0),
      },
      // Add more events
    ];
  
    return (
        <div className='bg-gray-50 border-gray-200 border rounded-md py-3 px-5 h-full w-[70%]'>
            <h2>My Schedules</h2>
            <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            />
        </div>
    );
}

export default CalendarPanel