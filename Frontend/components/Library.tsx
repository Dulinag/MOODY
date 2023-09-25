"use client"

import { TbPlaylist } from 'react-icons/tb'
import { AiOutlinePlus } from 'react-icons/ai'

const Library = () => {
    const onClick = () => {
        //upload function
    }

  return (
    <div className="flex flex-col">
        <div className="flex items-center justify-between px-5 pt-4">
            <div 
                className="
                inline-flex
                items=center
                gap-x-2">
                    <TbPlaylist className="text-neutral-400" size ={26} />
                    <p className='
                    inline-flex
                    items-center
                    gap-x-2' >
                        Your Library
                    </p>
            </div>
            <AiOutlinePlus 
                onClick ={onClick}
                size={20}
                className="
                    text-neutral-400
                    curosr-pointer
                    hover:text-white
                    transition" />
        </div>
        <div className="flex flex-col gap-y-2 mt-2 px-3">
            <p>Put Songs here later</p> <br/>
            <p>Put Songs here later</p> <br/>
            <p>Put Songs here later</p> <br/>
            <p>Put Songs here later</p> <br/>
        </div>
    </div>
  )
}

export default Library