import { useState } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { getSeason } from "api/OMDB";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { SEASON, EPISODE } from "lib/Interfaces";
import Slider from "components/Slider";

interface I_HOME {
  isError: boolean;
}

const season = 1;
const tvSeries = "Insecure";

export default function Home({ isError }: I_HOME) {
  const { data } = useQuery<SEASON>(["InsecurefirstSeason"]);

  const [selectedEpisode, setSelectedEpisode] = useState(0);

  const currentEpisode = data?.Episodes[selectedEpisode];

  const hasRating = currentEpisode?.imdbRating !== "N/A";

  if (data && currentEpisode)
    return (
      <div className={styles.wrapper}>
        <div>
          <Image
            src={data.Poster}
            alt="Tv Series"
            fill
            className={styles.season_poster}
          />
          <div className={styles.season_info_slider}>
            <div className={styles.season_info}>
              <p>Season {season}</p>
              <br />
              <h1>{data.Title}</h1>
              <br />
              <p>{data.Plot}</p>
            </div>
            <Slider
              episodes={data.Episodes}
              selectedEpisode={selectedEpisode}
              setSelectedEpisode={setSelectedEpisode}
            />
          </div>
        </div>

        <div>
          <Image src={currentEpisode.Poster} alt="Episode" fill />
        </div>
        <div className={styles.episode_info}>
          <div className={styles.episode_date_rating}>
            <p>
              Episode {currentEpisode.index + 1} - {currentEpisode.Released}
            </p>
            <div className={styles.episode_rating}>
              <Image
                src={hasRating ? "/icons/star-disabled.svg" : "/icons/star.svg"}
                alt="Tv Series"
                height={30}
                width={30}
              />
              <p>{currentEpisode.imdbRating}</p>
            </div>
          </div>
          <hr />
          <div className={styles.episode_caption_container}>
            <p className={styles.episode_title}>{currentEpisode.Title}</p>
            <p>{currentEpisode.Plot}</p>
          </div>
        </div>
      </div>
    );
  return <></>;
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  let isError = false;
  let statusCode = 200;
  try {
    await queryClient.fetchQuery(["InsecurefirstSeason"], () =>
      getSeason(tvSeries, season)
    );
  } catch (error) {
    isError = true;
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      isError,
      statusCode,
    },
  };
};
