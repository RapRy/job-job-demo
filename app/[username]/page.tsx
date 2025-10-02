
import CountPanel from '@/components/CountPanel'
import React from 'react'
import CalendarPanel from '@/components/dashboard/CalendarPanel'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='flex flex-col gap-5 w-full p-3'>
      <div className='flex flex-col gap-3 col-span-full w-full h-fit md:flex-row md:gap-5'>
        <CountPanel count={20} text='Applications' />
        <CountPanel count={0} text='Interviews' />
        <CountPanel count={0} text='job offers' />
      </div>
      <CalendarPanel />
    </div>
  )
}

export default page