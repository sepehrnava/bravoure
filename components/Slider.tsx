import Image from "next/image";
import ScrollContainer from "react-indiana-drag-scroll";
import styles from "../styles/Slider.module.css";
import { EPISODE } from "lib/Interfaces";
import { useRef } from "react";

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
    if (direction === "left") {
      sliderRef.current?.scrollBy({ left: -560, behavior: "smooth" });
    } else {
      sliderRef.current?.scrollBy({ left: 560, behavior: "smooth" });
    }
  };

  const onClickSlider = (index: number) => {
    sliderRef.current?.scrollTo({
      left: index * 280,
      behavior: "smooth",
    });
    setSelectedEpisode(index);
  };

  return (
    <div className={styles.slider_container}>
      <ScrollContainer className={styles.slider} innerRef={sliderRef}>
        {episodes.map((episode, index) => {
          return (
            <div
              key={index}
              className={styles.slider_item}
              onClick={() => onClickSlider(index)}
            >
              <div>
                <Image
                  src={episode.Poster}
                  alt="episode"
                  fill
                  className={`transition-opacity ${
                    selectedEpisode === index ? "opacity-100" : "opacity-40"
                  }`}
                />
                <div className={styles.slider_episode_number}>
                  {episode.index + 1}
                </div>
              </div>

              <p className={styles.slider_title}>{episode.Title}</p>

              <p className={styles.slider_caption}>{episode.Plot}</p>
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
          className="transform rotate-180"
          onClick={() => onClickArrows("left")}
        />
        <Image
          src="/icons/arrow-right.svg"
          alt="Tv Series"
          height={20}
          width={35}
          onClick={() => onClickArrows("right")}
        />
      </div>
    </div>
  );
};

export default Slider;
