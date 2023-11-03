import { NextResponse } from "next/server";

export const getPlaylists = async () => {
    try {
      const response = await fetch('http://localhost:5000/playlists');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  }