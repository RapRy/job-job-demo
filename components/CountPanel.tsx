import React from 'react'

type Props = {
    count: string | number;
    text: string;
}

const CountPanel = ({
    count, text
}: Props) => {
  return (
    <div className='bg-gray-50 border-gray-200 border rounded-md w-full py-3 px-5 flex flex-col justify-center gap-4 h-28'>
        <span className='text-4xl font-bold'>{count}</span>
        <span className='text-md font-bold uppercase'>{text}</span>
    </div>
  )
}

export default CountPanel