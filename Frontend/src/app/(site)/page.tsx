import Header from "@/components/Header"
import ListItem from "@/components/ListItem"
import PageContent from "./components/pageContent"
import { dummyData } from '@/data/dummydata'


export const revalidate = 0;

export default function Home() {
  return (
    <div className="
      bg-neutral-900
      rounded-lg
      h-full
      w-full
      overflow-hidden
      overflow-y-auto
    ">
        <Header>
          <div className="mb-2">
            <h1 className="
              text-white
              text-3xl
              font-semibold">
              Moody 
            </h1>
            <div className="
              grid
              grid-cols-2
              sm:grid-cols-2
              xl:grid-cols-6
              2xl:grid-cols-6
              gap-3
              mt-4
              col-span-1
              ">
                <ListItem
                  image='/images/liked.png'
                  name="liked Songs" 
                  href="liked"/>
            </div>
          </div>
        </Header>
        <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
            <h1 className="text-white text-2xl font-semibold">
              Newest Songs
            </h1>
        </div>
          <div >
            <PageContent songs={dummyData}/>
          </div>
        </div>
    </div>
  )
}
