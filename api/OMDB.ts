import axios from "axios";
import { TVSERIES, SEASON, EPISODE } from "lib/Interfaces";
const baseUrl = process.env.OMDB_API;
const apikey = process.env.OMDB_API_KEY;

export const getSeason = async (series: string, season: number) => {
  if (!baseUrl || !apikey) {
    throw new Error(
      "OMDB_API or OMDB_API_KEY is not defined in environment variables"
    );
  }

  const { data: seriesData } = await axios.get<TVSERIES>(baseUrl, {
    params: {
      apikey,
      t: series,
    },
  });

  const { data: seasonData } = await axios.get<SEASON>(baseUrl, {
    params: {
      apikey,
      i: seriesData.imdbID,
      Season: season,
    },
  });

  // I had to make request to api for each episode because of the api limitation

  const unSortedEpisodes: EPISODE[] = [];

  await Promise.all(
    seasonData.Episodes.map(async (element: EPISODE, index: number) => {
      const { data: episode } = await axios.get<EPISODE>(baseUrl, {
        params: {
          apikey,
          i: element.imdbID,
        },
      });
      unSortedEpisodes.push({ ...episode, index });
    })
  );

  const episodes = unSortedEpisodes.sort((a, b) => a.index - b.index);

  const { Poster, Plot } = seriesData;

  return { ...seasonData, Episodes: episodes, Poster, Plot };
};
