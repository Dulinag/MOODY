"use client"
import { useRouter } from 'next/navigation';
import {twMerge} from 'tailwind-merge'

interface HeaderProps {
    children: React.ReactNode;
    className ?: string;
  }

const Header: React.FC<HeaderProps> = ( { children, className}) => {
  const router = useRouter()
  const handleLogout = () => {

  }
    return (
    <div className={twMerge(`
        h-fit 
        bg-gradient-to-b from-purple-500/20 to-neutral-900
        p-6`)}>
            <div className='
            w-full
            mb-4
            flex
            items-center
            justify-between' >
              <div className="
                hidden
                md:flex
                gap-x-2
                items-center">

              </div>

            </div>
        </div>
  )
}

export default Header