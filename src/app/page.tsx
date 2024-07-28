"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import getSong, { parseLyrics } from "@/helper/song";
import { Skeleton } from "../components/ui/skeleton";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
export default function Home() {
  const [lyrics, setLyrics] = useState<string[]>([]);
  const [artist, setArtist] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [songName, setSongName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function getnow() {
    if (songName.length <= 0) {
      console.log("search something");
    }
    setLoading(true);
    try {
      const resp = await getSong(songName);
      console.log(resp);
      const parse_lyrics = parseLyrics(resp?.data.lyrics);
      setLyrics(parse_lyrics);
      setArtist(resp.data.artist);
      setTitle(resp.data.title);
    } catch (error) {
      console.error("Failed to fetch song data", error);
    } finally {
      setLoading(false);
      setSongName("");
    }
  }

  return (
    <main className="bg-black text-white w-full min-h-screen">
      <h1 className="text-9xl md:text-[18rem] z-[2]  md:leading-[0.8] text-center w-full">
        LYRICS
      </h1>
      <div className="w-full md:w-1/2 mx-auto p-4 md:p-8 flex max-md:flex-col max-md:items-center max-md:gap-3">
        <input
          type="text"
          placeholder="Song Name"
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
          className="bg-transparent flex-1 text-xl outline-none border border-slate-700 px-5 py-3"
        />
        {loading ? (
          <button
            className="bg-slate-300 max-md:w-1/2 px-8 py-4 text-black cursor-pointer"
            disabled
          >
            Search
          </button>
        ) : (
          <button
            className="bg-white max-md:w-1/2 px-8 py-4 text-black cursor-pointer"
            onClick={getnow}
          >
            Search
          </button>
        )}
      </div>
      <div className="w-fit mx-auto py-5 mt-10 relative ">
        <h2 className="text-5xl text-center">{title}</h2>
        <p className=" absolute -bottom-2 right-0">{artist}</p>
      </div>

      <div className="w-full px-10 md:w-1/2 h-[60vh] mt-14 md:h-80 mx-auto overflow-y-scroll">
        {lyrics.map((e, i) => (
          <div key={i}>
            <h2 className="text-2xl my-3">{e.title}</h2>
            <p>{e?.content}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
