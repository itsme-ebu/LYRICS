// types/genius-lyrics.d.ts
declare module "genius-lyrics" {
  class Client {
    constructor(accessToken?: string);
    songs: {
      search(query: string): Promise<Song[]>;
    };
  }

  class Song {
    title: string;
    lyrics(): Promise<string>;
  }

  export { Client, Song };
}
