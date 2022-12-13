import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { getSeason } from "api/OMDB";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { SEASON } from "lib/Interfaces";

interface I_HOME {
  isError: boolean;
}

export default function Home({ isError }: I_HOME) {
  const { data } = useQuery<SEASON>(["firstSeason"]);
  if (data === undefined) return <div>loading...</div>;
  return (
    <div className={styles.wrapper}>
      <div>
        <Image src="/1.png" alt="Tv Series" fill />
      </div>
      <div>
        <Image src={data.Episodes[0].Poster} alt="Tv Series" fill />
      </div>
      <div>
        <h1>Home Lorem ipsum dolor sit amet</h1>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  let isError = false;
  let statusCode = 200;
  try {
    await queryClient.fetchQuery(["firstSeason"], () =>
      getSeason("Insecure", 1)
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
