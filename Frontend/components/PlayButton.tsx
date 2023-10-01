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
            bg-green-500/90
            p-3
            drop-shadow-md
            translate
            translate-y-1/4
            group-hover:translate-y-0
            right-5
            group-hover:opacity-100
            hover:scale-110
          '>
            <FaPlay className="text-black" size={16}/>
        </div>
  )
}

export default PlayButton