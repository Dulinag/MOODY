//@ts-nocheck
"use client";
import { useEffect, useState, useRef } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import ReactHowler from 'react-howler'
import formatDuration from 'format-duration'

import { Song } from "@/types";
import useLoadArtistById from "@/hooks/useLoadArtistById";
import usePlayer from "@/hooks/usePlayer";

import LikeButton from "./LikeButton";
import Slider from "./Slider";


interface PlayerContentProps {
    song: Song;
    songUrl: string;
    artist: string
}

const PlayerContent: React.FC<PlayerContentProps> = ({
    song,
    songUrl,
    artist
}) => {
    const player = usePlayer();
    const volume = player.volume
    const [isPlaying, setIsPlaying] = useState(false);
    const [songduration, setSongduration ] = useState(0);
    const [seek, setSeek] = useState(0.0)
    const [isSeeking, setIsSeeking] = useState(false)
    const soundRef = useRef(null)

    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

    const onPlayNext = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const nextSong = player.ids[currentIndex + 1];

        if (!nextSong) {
            return player.setId(player.ids[0]);
        }

        player.setId(nextSong);
    }

    const onPlayPrevious = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const previousSong = player.ids[currentIndex - 1];

        if (!previousSong) {
            return player.setId(player.ids[player.ids.length - 1]);
        }

        player.setId(previousSong);
    }



    useEffect(() => {
        setIsPlaying(true);
      }, [])

    useEffect(() => {
    let timerId : number

    const updateSeekBar = () => {
        if(soundRef.current){
            setSeek(soundRef.current.seek());
        }
        timerId = requestAnimationFrame(updateSeekBar);
      };

    if (isPlaying && !isSeeking) {
       updateSeekBar();
    } else {
        cancelAnimationFrame(timerId);
    }
    
    }, [isPlaying,isSeeking])

    const handlePlay = () => {
        if (!isPlaying) {
            setIsPlaying(true);
            setIsSeeking(true);
        } else {
            setIsSeeking(false)
            setIsPlaying(false);
        }
    }

    const formatTime = (timeInSeconds = 0) => {
        return formatDuration(timeInSeconds * 1000)
      }
    
    const onSeek = (e) => {
        setIsSeeking(true)
        e && e.target && e.target.value ?(setSeek(parseFloat(e.target.value)),
        soundRef.current.seek(e.target.value)): setIsSeeking(false);
        setIsSeeking(false)
    }
    
    const onLoad = () => {
            const songDuration = soundRef.current.duration()
            setSongduration(songDuration)
    }

    const onEnd = () => {
            setIsPlaying(false);
            onPlayNext();
            setSeek(0)
    }
    const toggleMute = () => {
        if (volume === 0) {
            player.setVolume(1);
        } else {
            player.setVolume(0);
        }
    }

    return (
        <div className="grid grid-cols-3 md:grid-cols-3 h-full">
            <div className="flex min-w-[100px] justify-start">
                <div className="flex items-center gap-x-20">
                <div className="flex items-center gap-x-3">
                    {song && song[0] && song[0].image_url ? (
                        <img src={song[0].image_url} width={60} height={60} alt="Song Cover" />
                    ) : (
                        <></>
                    )}
                    <div className="flex flex-col">
                    {song && song[0] && song[0].title ? <p>{song[0].title}</p> : <p>No title available</p>}
                    
                    <p className="
                        text-neutral-400 
                        text-sm 
                        pb-4 
                        truncate
                    ">By {artist}</p>
                    </div>
                </div>
                    <LikeButton songId={song.song_id} />
                    <ReactHowler
                        playing={isPlaying}
                        src={songUrl}
                        ref={soundRef}
                        onLoad={onLoad}
                        onEnd={onEnd}
                        onSeek={onSeek}
                        html5={true}
                        volume={volume}
                        />
                </div>
            </div>
            {/* mobile */}
            <div
                className="
            flex 
            md:hidden 
            col-auto 
            w-full 
            justify-end 
            items-center
          "
            >
                <div
                    onClick={handlePlay}
                    className="
                    h-10
                    w-10
                    flex 
                    items-center 
                    justify-center 
                    rounded-full 
                    bg-white 
                    p-5 
                    cursor-pointer
                    "
                >
                    <Icon size={30} className="text-black" />
                </div>
            </div>
            {/* big screen */ }      
            <div className="text-gray-600 flex flex-col ">
            <div
                className="
                    hidden
                    h-full
                    md:flex 
                    justify-center 
                    items-center 
                    w-full 
                    max-w-[722px] 
                    gap-x-6
                "
            >
                <AiFillStepBackward
                    onClick={onPlayPrevious}
                    size={30}
                    className="
                    text-neutral-400 
                    cursor-pointer 
                    hover:text-white 
                    transition
                    "
                />
                <div
                    onClick={handlePlay}
                    className="
                        flex 
                        items-center 
                        justify-center
                        h-8
                        w-8 
                        rounded-full 
                        bg-white 
                        p-1 
                        cursor-pointer
                        "
                >
                    <Icon size={30} className="text-black" />
                </div>
                <AiFillStepForward
                    onClick={onPlayNext}
                    size={30}
                    className="
                    text-neutral-400 
                    cursor-pointer 
                    hover:text-white 
                    transition
                    "
                />
                
            </div>
                {/* Seek Bar */}
                <div className="flex justify-center items-center gap-x-2">
                    <div className="w-1/10">
                    <p className="text-xs text-neutral-200">{formatTime(seek)}</p>
                    </div>
                    <div className="w-full flex justify-center items-center  ">    
                    <input
                        className="w-full h-0.5 bg-gray-900 rounded-lg accent-gray-200 cursor-pointer range-sm dark:bg-white transition"
                        type='range'
                        min='0'
                        max={songduration ? songduration.toFixed(2) as unknown as number : 0}
                        step='0.01'
                        value={seek}
                        onChange={onSeek}
                        onMouseDown={() => setIsSeeking(true)}  
                        onMouseUp={() => setIsSeeking(false)}
                    />
                    </div>
                    <div className="w-1/10 text-neutral-200 text-right">
                    <p className="text-xs">{formatTime(songduration)}</p>
                    </div>
                </div>
                </div>
            

            <div className="hidden md:flex w-full justify-end pr-2">
                <div className="flex items-center gap-x-2 w-[120px]">
                    <VolumeIcon
                        onClick={toggleMute}
                        className="cursor-pointer"
                        size={34}
                    />
                    <Slider
                        value={volume}
                        onChange={(value) => player.setVolume(value)}
                    />
                </div>
            </div>

        </div>
    );
}

export default PlayerContent;