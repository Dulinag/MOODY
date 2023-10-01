"use client";

import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";

interface LikeButtonProps {
  songId: string;
};

const LikeButton: React.FC<LikeButtonProps> = ({
  songId
}) => {
  const router = useRouter();

  const [isLiked, setIsLiked] = useState<boolean>(false);


  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    //handle Like function here later
  }

  return (
    <button 
      className="
        cursor-pointer 
        hover:opacity-75 
        transition
      "
      onClick={handleLike}
    >
      <Icon color={isLiked ? '#22c55e' : 'white'} size={25} />
    </button>
  );
}

export default LikeButton;