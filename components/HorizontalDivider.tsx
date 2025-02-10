import React from 'react'

type Props = {
    text: string
}

const HorizontalDivider = ({ text }: Props) => {
  return (
    <div className="flex items-center my-7"> 
                <hr className="flex-grow border-t border-foreground opacity-30" /> 
                <span className="px-3 text-text-color-1 text-sm"> 
                    {text}
                </span> 
                <hr className="flex-grow border-t border-foreground opacity-30" /> 
            </div> 
  )
}

export default HorizontalDivider