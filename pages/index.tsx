/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { BsFillPauseCircleFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player";
import styles from "../styles/Home.module.css";
import {
  DATA_ANIMATIONS,
  DATA_BUTTON,
  DATA_CONTENT,
  DATA_CONTENT_KHAC_KY,
  DATA_MUSIC,
} from "./constants";

type DataState = {
  id: number;
  text: string;
};

const Home: NextPage = () => {
  const [text, setText] = useState("");
  const [textButton, setTextButton] = useState(DATA_BUTTON[0].text);

  const [bg, setBg] = useState("");
  const [imageGif, setImageGif] = useState(DATA_ANIMATIONS[0].url);
  const [isAnimation, setAnimation] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [isHokBitNua, setHokBitNua] = useState(false);
  const [dataMain, setDataMain] = useState<DataState[]>([]);

  const [urlMusic, setUrlMusic] = useState(DATA_MUSIC[0].url);
  const [indexActive, setIndexActive] = useState(0);

  const [isSSR, setIsSSR] = useState(true);

  const playerRef = useRef(null);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  const [isPlay, setIsPlay] = useState(false);

  const handleStart = () => {
    setTimeout(() => {
      setIsStart(true);
    }, 1000);
  };

  const setActiveIndex = (activeIndex: number) => {
    setIndexActive(activeIndex);
    setUrlMusic(DATA_MUSIC[activeIndex].url);
  };

  const goPrev = () => setActiveIndex(Math.max(indexActive - 1, 0));
  const goNext = () =>
    setActiveIndex(Math.min(indexActive + 1, DATA_MUSIC.length - 1));

  const handlePlayer = () => {
    setIsPlay(!isPlay);
  };

  const randomText = () => {
    const numberRandom = Math.floor(Math.random() * (dataMain.length - 1)) + 1;
    const numberButtonRandom = Math.floor(Math.random() * 2) + 1;
    setText(dataMain[numberRandom].text);
    setTextButton(DATA_BUTTON[numberButtonRandom].text);
  };

  const changeBg = () => {
    const numberFrom1To98 = Math.floor(Math.random() * 98) + 1;

    if (isMobile) {
      setBg(`https://www.picsum.photos/900/16${numberFrom1To98}`);
    } else {
      setBg(`https://www.picsum.photos/1600/9${numberFrom1To98}`);
    }
  };

  const handleAnimation = () => {
    setAnimation(true);
    const numberRandom =
      Math.floor(Math.random() * (DATA_ANIMATIONS.length - 1)) + 1;

    setImageGif(DATA_ANIMATIONS[numberRandom]?.url);

    setTimeout(() => {
      setAnimation(false);
    }, 2500);
  };

  const handleHokBitNua = () => {
    setHokBitNua(true);

    setTimeout(() => {
      setHokBitNua(false);
    }, 2500);
  };

  useEffect(() => {
    const numberRandom = Math.floor(Math.random() * (dataMain.length - 1)) + 1;
    setText(dataMain[numberRandom]?.text);

    if (isMobile) {
      setBg("https://picsum.photos/900/1600");
    } else {
      setBg("https://picsum.photos/1600/900");
    }
  }, [dataMain]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Love Is Always Here</title>
        <meta name="description" content="Love Is Always Here" />
        <link rel="icon" href="/heartIcon.png" />
      </Head>
      {!isSSR && (
        <div>
          <ReactPlayer
            ref={playerRef}
            url={urlMusic}
            style={{ display: "none" }}
            controls={false}
            playing={isPlay}
            progressInterval={200}
          />
        </div>
      )}
      <div
        className={styles.base}
        style={{
          background: `url(${bg})`,
        }}
      >
        {/* Kết nối với vụ trụ  */}
        <div>
          {!isStart && (
            <>
              <div>
                <button
                  onClick={() => {
                    handlePlayer();
                    handleStart();
                    setDataMain(DATA_CONTENT);
                  }}
                  className={styles.glowOnHover}
                  type="button"
                >
                  Kết nối với toàn bộ vũ trụ
                </button>
              </div>
              <div className={styles.buttons}>
                <button
                  onClick={() => {
                    handlePlayer();
                    handleStart();
                    setDataMain(DATA_CONTENT_KHAC_KY);
                  }}
                  className={styles.button87}
                  type="button"
                >
                  Kết nối với vũ trụ Khắc Kỷ
                </button>
              </div>
            </>
          )}
        </div>

        {isStart && (
          <>
            {/* Content */}
            {!isAnimation && !isHokBitNua && (
              <div className={styles.content}>
                <div className={styles.text}>{text}</div>
                <div className={styles.btnContainer}>
                  <div
                    className={styles.buttonText}
                    onClick={() => randomText()}
                  >
                    {textButton}
                  </div>
                </div>
              </div>
            )}

            {/* Animations */}
            {isAnimation && (
              <div className={styles.animations}>
                <img src={imageGif} alt="" className={styles.gif} />
              </div>
            )}

            {/* hok bit nua */}

            {isHokBitNua && (
              <div className={styles.hokBitNua}>
                <div>Chúc trí tuệ và tình yêu luôn ở bên bạn!</div>
              </div>
            )}
          </>
        )}

        <div className={styles.play}>
          <div
            className={`${styles.playItem13} ${
              indexActive === 0 && styles.disable
            }`}
          >
            <BiSkipPrevious onClick={goPrev} fontSize="36px" />
          </div>
          <div className={styles.playItem2} onClick={() => handlePlayer()}>
            {!isPlay ? (
              <FaPlay fontSize="32px" />
            ) : (
              <BsFillPauseCircleFill fontSize="32px" />
            )}
          </div>
          <div
            className={`${styles.playItem13} ${
              indexActive === DATA_MUSIC.length - 1 && styles.disable
            }`}
          >
            <BiSkipNext onClick={goNext} fontSize="36px" />
          </div>
        </div>

        <div className={styles.changBG}>
          <div
            className={styles.buttonRandomAnimation}
            onClick={() => handleAnimation()}
          />
          <div className={styles.buttonChangeBG} onClick={() => changeBg()} />
          <div
            className={styles.buttonIDontKnow}
            onClick={() => handleHokBitNua()}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
