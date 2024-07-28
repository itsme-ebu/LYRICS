import axios from "axios";

export function parseLyrics(
  lyrics: string
): Array<{ title: string; content: string }> {
  const sections = lyrics.split(/(\[.*?\])/).filter(Boolean); // Split and filter empty strings
  const parsedLyrics: Array<{ title: string; content: string }> = [];

  let currentTitle = "";
  let currentContent = "";

  for (const section of sections) {
    if (section.startsWith("[") && section.endsWith("]")) {
      if (currentTitle && currentContent) {
        parsedLyrics.push({
          title: currentTitle,
          content: currentContent.trim(),
        });
      }
      currentTitle = section;
      currentContent = "";
    } else {
      currentContent += section + "\n";
    }
  }

  if (currentTitle && currentContent) {
    parsedLyrics.push({
      title: currentTitle,
      content: currentContent.trim(),
    });
  }

  return parsedLyrics;
}

function displayLyrics(
  lyrics: Array<{ title: string; content: string }>
): void {
  const lyricsContainer = document.getElementById("lyrics");
  if (!lyricsContainer) {
    return;
  }

  lyricsContainer.innerHTML = lyrics
    .map(
      (section) => `
      <div class="lyrics-section">
        <h3 class="text-4xl">${section.title}</h3>
        <p>${section.content.replace(/\n/g, "<br>")}</p>
      </div>
    `
    )
    .join("");
}
const getSong = async (song: string) => {
  const params = { song: song };
  try {
    const response = await axios.get(
      "https://lyrics-liard.vercel.app/api/song",
      { params }
    );
    return response;
  } catch (error) {
    console.log("errorr");
  }
};

export default getSong;
