import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "genius-lyrics";
import { json } from "stream/consumers";
import { NextRequest, NextResponse } from "next/server";
interface Song {
  lyrics(): Promise<string>;
  title: string;
  thumbnail: string; // Ensure this is included
  _raw: {
    artist_names: string;
  };
}
interface ResponseData {
  lyrics: string;
  title: string;
  thumbnail?: string;
  artist?: string;
}

export async function GET(req: NextRequest, res: NextResponse) {
  console.log(req);

  const song_name = req?.url?.split("song=")[1].split("+").join(" ");
  const client = new Client();
  const searches = await client.songs.search(song_name || "");
  const firstSong = searches[0] as Song; // Use the custom type assertion
  const lyrics = await firstSong.lyrics();
  const responsee: ResponseData = {
    lyrics: lyrics,
    title: firstSong.title,
    thumbnail: firstSong.thumbnail, // No error should occur now
    artist: firstSong._raw.artist_names,
  };

  return new Response(JSON.stringify(responsee));
}
