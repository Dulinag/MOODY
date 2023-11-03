import { NextResponse } from "next/server";

export const getSongs = async () => {
    try {
      const response = await fetch('http://localhost:5000/songs');
      const datax = await response.json();
      return datax;
    } catch (error) {
      console.error('Error:', error);
    }
  }