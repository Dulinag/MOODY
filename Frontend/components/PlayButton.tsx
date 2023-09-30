import { FaPlay } from "react-icons/fa"

const PlayButton = () => {
  return (
    <div className='
            transition
            opacity-0
            rounded-full
            flex
            items-center
            justify-center
            bg-purple-500/90
            p-2
            drop-shadow-md
            right-5
            group-hover:opacity-100
            hover:scale-110
          '>
            <FaPlay className="text-black" size={16}/>
        </div>
  )
}

export default PlayButton