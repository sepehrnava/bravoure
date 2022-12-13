import { useEffect, useRef } from "react";
import Image from "next/image";
import ScrollContainer from "react-indiana-drag-scroll";
import styles from "../styles/Slider.module.css";
import { EPISODE } from "lib/Interfaces";

interface I_SLIDER {
  episodes: EPISODE[];
  selectedEpisode: number;
  setSelectedEpisode: (index: number) => void;
}

const Slider = ({
  episodes,
  selectedEpisode,
  setSelectedEpisode,
}: I_SLIDER) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const onClickArrows = (direction: "left" | "right") => {
    if (direction === "left" && selectedEpisode > 0) {
      setSelectedEpisode(selectedEpisode - 1);
    }
    if (direction === "right" && selectedEpisode < episodes.length - 1) {
      setSelectedEpisode(selectedEpisode + 1);
    }
  };

  const onClickSlide = (index: number) => {
    setSelectedEpisode(index);
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: selectedEpisode * 296,
        behavior: "smooth",
      });
    }
  }, [selectedEpisode]);

  return (
    <div className={styles.slider_container}>
      <ScrollContainer className={styles.slider} innerRef={sliderRef}>
        {episodes.map((episode, index) => {
          return (
            <div
              key={index}
              className={styles.slider_item}
              onClick={() => onClickSlide(index)}
            >
              <div>
                <Image
                  src={episode.Poster}
                  alt="episode"
                  fill
                  className={`${styles.slider_title} transition-opacity ${
                    selectedEpisode === index ? "opacity-100" : "opacity-40"
                  }`}
                />
                <div className={styles.slider_episode_number}>
                  {episode.index + 1}
                </div>
              </div>

              <p
                className={`${styles.slider_title} transition-opacity ${
                  selectedEpisode === index ? "opacity-100" : "opacity-40"
                }`}
              >
                {episode.Title}
              </p>

              <p
                className={`${styles.slider_caption} transition-opacity ${
                  selectedEpisode === index ? "opacity-80" : "opacity-40"
                }`}
              >
                {episode.Plot}
              </p>
            </div>
          );
        })}
      </ScrollContainer>
      <div className={styles.slider_arrows}>
        <Image
          src="/icons/arrow-right.svg"
          alt="Tv Series"
          height={20}
          width={35}
          className={`transition-opacity transform rotate-180 ${
            selectedEpisode === 0 ? "opacity-20" : "opacity-100"
          }`}
          onClick={() => onClickArrows("left")}
        />
        <Image
          src="/icons/arrow-right.svg"
          alt="Tv Series"
          height={20}
          width={35}
          onClick={() => onClickArrows("right")}
          className={`transition-opacity ${
            selectedEpisode === episodes.length - 1
              ? "opacity-20"
              : "opacity-100"
          }`}
        />
      </div>
    </div>
  );
};

export default Slider;
