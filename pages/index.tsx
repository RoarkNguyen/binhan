/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import styles from "../styles/Home.module.css";
import { FaPlay } from "react-icons/fa";
import { BsFillPauseCircleFill } from "react-icons/bs";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import ReactPlayer from "react-player";

const Home: NextPage = () => {
  const [text, setText] = useState(DATA_CONTENT[0].text);
  const [textButton, setTextButton] = useState(DATA_BUTTON[0].text);

  const [bg, setBg] = useState("");
  const [imageGif, setImageGif] = useState(DATA_ANIMATIONS[0].url);
  const [isAnimation, setAnimation] = useState(false);
  const [isHokBitNua, setHokBitNua] = useState(false);

  const [urlMusic, setUrlMusic] = useState(DATA_MUSIC[0].url);
  const [indexActive, setIndexActive] = useState(0);

  const [isSSR, setIsSSR] = useState(true);

  const playerRef = useRef(null);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  const [isPlay, setIsPlay] = useState(false);

  const setActiveIndex = (activeIndex: number) => {
    console.log(activeIndex, "_activeIndex");

    const id = DATA_MUSIC[activeIndex].id;
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
    const numberRandom =
      Math.floor(Math.random() * (DATA_CONTENT.length - 1)) + 1;
    const numberButtonRandom = Math.floor(Math.random() * 2) + 1;
    setText(DATA_CONTENT[numberRandom].text);
    setTextButton(DATA_BUTTON[numberButtonRandom].text);
  };

  const changeBg = () => {
    const numberFrom1To8 = Math.floor(Math.random() * 8) + 1;

    if (isMobile) {
      setBg(`https://www.picsum.photos/900/160${numberFrom1To8}`);
    } else {
      setBg(`https://www.picsum.photos/1600/90${numberFrom1To8}`);
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
    if (isMobile) {
      setBg("https://picsum.photos/900/1600");
    } else {
      setBg("https://picsum.photos/1600/900");
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Love Is Always Here</title>
        <meta name="description" content="Love Is Always Here" />
        <link rel="icon" href="/favicon.ico" />
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
            config={{
              file: {
                attributes: { preload: "auto" },
                forceAudio: true,
              },
            }}
          />
        </div>
      )}
      {playerRef ? (
        <div onClick={() => setIsPlay(false)}>pause</div>
      ) : (
        <div onClick={() => setIsPlay(true)}>play</div>
      )}
      <div
        className={styles.base}
        style={{
          background: `url(${bg})`,
        }}
      >
        {/* Content */}
        {!isAnimation && !isHokBitNua && (
          <div className={styles.content}>
            <div className={styles.text}>{text}</div>
            <div className={styles.btnContainer}>
              <div className={styles.buttonText} onClick={() => randomText()}>
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

const DATA_MUSIC = [
  {
    id: 0,
    url: "/music/focus.mp3",
  },

  {
    id: 1,
    url: "/music/seetinh.mp3",
  },
  {
    id: 2,
    url: "/music/yoursmile.mp3",
  },
  {
    id: 3,
    url: "/music/believer.mp3",
  },
  {
    id: 4,
    url: "/music/cua.mp3",
  },
  {
    id: 4,
    url: "/music/internetlove.mp3",
  },
  {
    id: 6,
    url: "/music/237c.mp3",
  },
  {
    id: 7,
    url: "/music/simplelove.mp3",
  },
  {
    id: 8,
    url: "/music/thichquaruina.mp3",
  },
  {
    id: 9,
    url: "/music/100years.mp3",
  },
  {
    id: 10,
    url: "/music/bedtime.mp3",
  },
];

const DATA_CONTENT = [
  {
    id: 0,
    text: `"Khi bạn nhìn vào một thân cây hay một con người, từ sự tĩnh lặng ở trong bạn, thì ai đang nhìn vậy? Có một cái gì đó, sâu hơn là con người của bạn, đang nhìn. Đó là Tâm đang nhìn vào cái vật mà chính Tâm đã sáng tạo ra."`,
  },
  {
    id: 1,
    text: `“Nếu bạn tin rằng bạn chỉ là thân tâm này, bạn sẽ chết! Nhưng khi bạn khám phá ra rằng bạn chính là Nhận Biết thì chuyện sinh tử chẳng bận lòng bạn nữa.”`,
  },
  {
    id: 2,
    text: `"Khi bên trong con có một cảm xúc tiêu cực nổ ra thì hãy thấu hiểu nó thay vì đánh nhau với nó. Tất cả các cảm xúc tiêu cực đều đến từ nỗi sợ một kết quả tiêu cực nào đó. Hãy cho cảm xúc đó xảy ra bất kể lý do gì, vì khi con cho nó xảy ra con mới thấy được bản chất của nó."`,
  },
  {
    id: 3,
    text: `“Chúng ta cần học cách nghỉ ngơi và thư giãn. Nó giúp ta phòng chống bệnh tật và giảm ngừa căng thẳng. Nó giúp ta có tâm trí sáng suốt để tập trung giải quyết các vấn đề.”`,
  },
  {
    id: 4,
    text: `"Nhớ rằng tôi sẽ chết, đó là công cụ quan trọng nhất tôi từng có để giúp mình thực hiện những lựa chọn lớn trong cuộc đời. Bởi vì hầu hết tất cả mọi thứ - tất cả những hy vọng phù phiếm, lòng kiêu hãnh, nỗi sợ mất mặt hay thất bại - tất cả những thứ này sẽ mờ nhạt đi khi ta đối diện với cái chết, chỉ để lại điều gì thật sự quan trọng.

    Nhớ rằng bạn sẽ chết, đó là cách tốt nhất tôi biết để tránh cái bẫy suy nghĩ rằng bạn vẫn còn thứ để mất. Bạn thực chất chẳng có gì. Không có lí do để không đi theo trái tim."`,
  },
  {
    id: 5,
    text: `"Khi bạn thật sự hiểu rằng bạn chỉ là một mảnh nhỏ của sự sống trong một vũ trụ bất tận, bạn sẽ tự nhiên cúi đầu trước mọi thứ."`,
  },
  {
    id: 6,
    text: `"Đừng lo cho ngày mai. Hãy để ngày mai mai lo. Hãy để lo lắng ngày nào đủ cho ngày ấy.”`,
  },
  {
    id: 7,
    text: `"Nếu một việc gì đến mà ta không dũng cảm giải quyết cho tới nơi tới chốn, nó nhất định sẽ trở lại. Cuộc sống là vậy, nó sẽ lần lượt bắt mình thực hành mãi một bài học, cho đến khi thành thục mới thôi."`,
  },
  {
    id: 8,
    text: `"Chúng ta thường đánh giá thấp sức mạnh của nụ cười, của lời tử tế, của sự vỗ về, của tâm lắng nghe, của lời khen ngợi chân thành, hoặc một cử chỉ săn sóc rất nhỏ. Tất cả những điều ấy đều ẩn chứa khả năng thay đổi một cuộc đời."`,
  },
  {
    id: 9,
    text: "Khôn ngoan chỉ đến qua con đường đau khổ. Có lẽ điều gì bắt trái tim ta tan nát chính là điều giúp trái tim rộng mở. Đau khổ giúp ta rất nhiều, nếu ta chấp nhận bài học mà đau khổ mang đến. Có lẽ chính thử thách lớn nhất trong đời sẽ ban tặng cơ hội lớn nhất.",
  },
  {
    id: 10,
    text: `"Mỗi khi bạn phán xét ai đó là bạn tiết lộ một phần của bản thân cần được chữa lành."`,
  },
  {
    id: 11,
    text: "Tuỳ duyên không phải là phó mặc. Tuỳ duyên là vẫn làm điều mình cho là phù hợp nhất nhưng trong lòng chấp nhận rằng: đủ duyên thì ra kết quả, còn không đủ duyên thì thôi.",
  },
  {
    id: 12,
    text: `"Khi bạn nhìn vào một thân cây hay một con người, từ sự tĩnh lặng ở trong bạn, thì ai đang nhìn vậy? Có một cái gì đó, sâu hơn là con người của bạn, đang nhìn. Đó là Tâm đang nhìn vào cái vật mà chính Tâm đã sáng tạo ra."`,
  },
  {
    id: 13,
    text: `“Bạn không phải là cái tâm này.

    Nếu bạn biết bạn không phải là cái tâm này, thì có gì khác biệt đâu khi cái tâm đó chộn rộn hoặc tĩnh lặng?
    
    Bạn không phải là cái tâm này.”`,
  },
  {
    id: 14,
    text: `“Can đảm không phải là không biết sợ. Cam đảm là biết chấp nhận, dấn thân và vượt qua bất chấp mọi nỗi sợ.
    Cam đảm không có nghĩa là theo đuổi không ngừng, mà là biết từ bỏ những thứ quá quen thuộc nhưng không còn phù hợp.
    Con đường can đảm là con đường của trái tim.”`,
  },
  {
    id: 14,
    text: `"Nghĩ về tình yêu thì rất dễ, còn yêu thì rất khó. Rất dễ để yêu cả thế giới, còn yêu một người cụ thể thì khó vô cùng."`,
  },
  {
    id: 15,
    text: `"Ngày xửa ngày xưa, một người đàn ông bị mất chiếc rìu nghi là con của người hàng xóm. Cậu bé bước đi như một tên trộm, trông như một tên trộm và nói năng như một tên trộm. Nhưng người đàn ông đã tìm thấy chiếc rìu của mình khi đang đào trong thung lũng, và lần sau khi nhìn thấy con trai hàng xóm, cậu bé đi lại, nhìn và nói như bao đứa trẻ khác."`,
  },
  {
    id: 16,
    text: `“Bất cứ khi nào bạn cảm thấy bất ổn, điều đó có nghĩa là bạn đã xa rời thực tại. Bất cứ khi nào bạn ở gần thực tại - thì vô cùng yên ổn, bình thản, yên tĩnh, ân huệ, im lặng, bình an. Bạn đang ở nhà bởi lẽ thực tại là ngôi nhà của bạn.”`,
  },
  {
    id: 17,
    text: `"Sự từ chối một cái đang là là nguyên nhân của khổ. Con khổ không phải vì điều đấy mà vì con từ chối điều đấy."`,
  },
  {
    id: 18,
    text: `“Không hoàn hảo thì cũng chẳng sao đâu, vạn vậy trên đời đều có vết nứt, đó là nơi ánh sáng sẽ chiếu vào.”`,
  },
  {
    id: 19,
    text: `"Chúng ta mang bên trong mình những điều kỳ diệu mà chúng ta tìm kiếm bên ngoài chúng ta."`,
  },
  {
    id: 20,
    text: `"Thực tại luôn luôn thật với chính nó. Khi hòa hợp với thực tại, bạn sẽ trải nghiệm hạnh phúc. Khi không hòa hợp với nó, lập tức bạn trải nghiệm nỗi đau. Đây là quy luật của vũ trụ; là cách mọi thứ diễn ra. Không ai thoát khỏi quy luật này. Đối với tôi, hiểu biết này là một ân huệ. Thực tại là bất biến. Tranh cãi với nó, chống lại nó, thì nó sẽ gây tổn thương - lần nào cũng vậy. Nó sẽ làm tổn thương bạn, làm tổn thương người khác, và nó sẽ góp phần vào xung đột chung của tất thảy chúng sinh."`,
  },
  {
    id: 21,
    text: `"Đừng nên vội vàng tìm câu trả lời cho cuộc sống;
    Đừng nên vội vàng mong muốn cuộc sống sẽ cho bạn biết hết các câu trả lời;
    Đôi khi, bạn cần phải kiên nhẫn chờ đợi."`,
  },
  {
    id: 22,
    text: `"Bản chất mọi đau khổ
    Do suy nghĩ mà ra
    Chớ vội tin đúng - thật
    Lập tức nhẹ hồn ta."`,
  },
  {
    id: 23,
    text: `“Bất kể điều gì làm phiền bạn, bất kể điều gì làm bạn khó chịu, đó là thầy của bạn.”`,
  },
  {
    id: 24,
    text: `"Nguyên nhân chính của bất hạnh không bao giờ là hoàn cảnh mà là suy nghĩ của bạn về nó."`,
  },
  {
    id: 25,
    text: `"Đối đầu với cuộc sống. Gặp gỡ cuộc sống. Những khoảnh khắc khó khăn sẽ có nhưng một ngày bạn sẽ thấy rằng những khoảnh khắc khó khăn đó đã cho bạn sức mạnh vì bạn đã gặp phải chúng.Nếu không có chúng, bạn sẽ không bao giờ được định tâm, được bắt rễ."`,
  },
  {
    id: 26,
    text: `"Bạn không đau khổ vì mọi thứ là vô thường. Bạn đau khổ vì mọi thứ là vô thường và bạn nghĩ rằng chúng là vĩnh viễn."

    - Thích Nhất Hạnh `,
  },
  {
    id: 27,
    text: `“Hãy cảm ơn những lúc bạn gặp khó khăn, bởi nếu không có khó khăn, bạn sẽ không có cơ hội để hiểu mình và trải nghiệm cuộc sống.”

    - Sưu tầm -`,
  },
  {
    id: 28,
    text: `"Tâm bất an: Đó là khi chúng ta không biết trân trọng những gì mình đang có, để rồi nuối tiếc khi mất đi những gì mình đã có.

    Tâm an lạc: Đó là khi chúng ta biết hài lòng với những gì mình đang có, dù vậy, vẫn chấp nhận khi mọi sự đổi thay."`,
  },
  {
    id: 29,
    text: `"Nhẫn nại là một đức tính tốt cần rèn luyện. Nhẫn nại không có nghĩa là để cho người khác lấn áp hay tự do lạm dụng bạn; mà có nghĩa là hãy bình tĩnh để diễn đạt mình một cách hữu hiệu và đúng lúc, đúng nơi, đúng lời, đúng việc."`,
  },
  {
    id: 30,
    text: `"Muốn bình an cũng là một loại bất an, muốn càng nhiều thì bất an càng tăng."`,
  },
  {
    id: 31,
    text: `“Thân thể này vô thường. Tâm này cũng vô thường. Mọi tướng, mọi trạng thái, mọi tình trạng tâm, bất kỳ cảm xúc hay suy nghĩ nào cũng vô thường cả.￼ Tức là tự đến rồi tự biến đổi, tự biến mất. Khi thấy rõ như thế thì sẽ tự không dính mắc, níu kéo bất cứ điều gì, dù là thân, tâm, hay mọi thứ trong cuộc sống. Ngay kể cả khi ta ngồi thiền, nhập vào trạng thái định sâu và thấy rất hỉ lạc thì nó cũng không kéo dài mãi. Nó cũng vô thường. Nó sẽ phải thay đổi.”`,
  },
  {
    id: 32,
    text: `“Một người tức giận là do không giải quyết được những đau buồn của mình. Họ là nạn nhân đầu tiên của sự đau buồn đó, còn bạn là người thứ hai. Hiểu được điều này, lòng tư bi sẽ nảy nở trong tim và sự tức giận sẽ tan biến. Đừng trừng phạt họ, thay vào đó, hãy nói gì đó, làm gì đó để vơi bớt nỗi đau buồn.”`,
  },
  {
    id: 33,
    text: `"Đời dạy ta muôn ngàn cách Nắm giữ,
    Đạo dạy người chỉ một chữ Buông.”`,
  },
  {
    id: 34,
    text: `“Đừng nhìn ra bên ngoài để tìm kiếm khoái cảm hay sự thỏa mãn, hay sự phê chuẩn, ổn định, hay tình yêu – bạn có một kho báu bên trong lớn hơn vô hạn lần so với bất cứ thứ gì mà thế giới có thể cung cấp.”`,
  },
  {
    id: 35,
    text: `“Những mầm mống khổ đau trong bạn có thể thật mạnh mẽ, nhưng đừng đợi cho đến khi mọi khổ đau đi hết rồi mới cho phép mình được hạnh phúc.”`,
  },
  {
    id: 36,
    text: `“Nghĩ về quá khứ và tương lai là không sai. Sai là đắm chìm trong quá khứ và tương lai mà quên mất thực tại đang là."`,
  },
  {
    id: 37,
    text: `"Hạnh phúc là một loại đau khổ vi tế. Bởi chỉ mong muốn điều hạnh phúc, dễ chịu là còn khổ, còn bám víu vào hạnh phúc là còn khổ.

    Đau khổ là một loại phước báu vi tế. Đau khổ càng lớn thì món quà càng to. Bởi nhận ra đau khổ làm bạn không còn muốn bám víu, không còn muốn dính mắc tâm bạn vào nó. Không còn dính mắc thì bạn được tự do.
    
    Hạnh phúc chưa hẳn đã tốt. Đau khổ chưa hẳn là không tốt. Đúng - sai, tốt - xấu: tất cả chỉ là tương đối. Vượt trên cả hạnh phúc và đau khổ, bạn sẽ tìm lại (ngộ ra) chính mình."`,
  },
  {
    id: 38,
    text: `"5 NGUYÊN TẮC ĐỂ HẠNH PHÚC:

    1. Tập tha thứ
    2. Bớt lo lắng
    3. Sống đơn giản
    4. Cho đi nhiều hơn
    5. Đừng trông đợi quá nhiều."`,
  },
  {
    id: 39,
    text: `“Không nên xem con đường tâm linh như là niềm vui thích hay thứ gì đó cao sang, mà nên xem nó như là việc đối mặt với sự thật về cuộc sống.”`,
  },
  {
    id: 40,
    text: `“Nếu bạn không có được điều bạn muốn có nghĩa là cái gì đó tốt đẹp hơn đang đến.”`,
  },
  {
    id: 41,
    text: `"Không ai có thể quay ngược lại thời gian để bắt đầu lại từ đầu, nhưng bất kì ai cũng có thể bắt đầu từ ngày hôm nay và tạo ra một kết thúc mới.”`,
  },
  {
    id: 42,
    text: `"Những suy nghĩ tiêu cực chỉ có thể mang lại cho bạn một cuộc sống bất lực.

    Những suy nghĩ tích cực chỉ có thể mang lại cho bạn một cuộc sống đỡ bực.
    
    Khi thấy rõ mọi điều mà không còn thấy điều gì tiêu cực hay tích cực,
    Bạn sẽ an nhiên và đùa nghịch giữa muôn trùng cuộn sóng của cuộc đời."`,
  },
  {
    id: 43,
    text: `"Tha thứ có nghĩa là chúng ta thả một người ra khỏi nhà tù, và thật ngạc nhiên, khi thấy chính mình là người tù này."`,
  },
  {
    id: 44,
    text: `“Bạn chỉ đẹp khi là chính bạn. Bạn đâu cần sự công nhận của người khác. Bạn chỉ cần chấp nhận chính mình mà thôi.”`,
  },
  {
    id: 45,
    text: `"Sự thật là trong cuộc sống mọi thứ đều thay đổi – dù bạn muốn hay không, dù bạn có ngồi bên bờ sông mà ước rằng “sông ơi hãy ngừng chảy, mùa ơi thôi đừng đi, hoa ơi xin đừng tàn, tuổi trẻ đừng giã biệt, tuổi già xin đừng đến, cuộc đời ơi xin chớ đưa ta đến nấm mồ”." - Trích sách "Cỏ tự nó mọc lên" - Osho -`,
  },
  {
    id: 46,
    text: `“Nếu bạn muốn thành công, hãy tôn trọng một quy luật: Đừng bao giờ nói dối chính mình.”`,
  },
  {
    id: 47,
    text: `"CHẤP NHẬN

    Khi ai đó chê trách bạn, hãy bình tâm lắng nghe. Khoan vội cắt lời họ và biện hộ cho mình.
    
    Nếu lời chê trách ấy đúng, đồng ý, xin lỗi và tìm xem bạn có thể làm gì để thay đổi.
    
    Nếu lời chê trách ấy là sai, vui vẻ nói: “Một ý hay, nhưng tôi có quan điểm của riêng mình.”"`,
  },
  {
    id: 48,
    text: `“Nếu bạn được hỏi: Im lặng là gì?
    Câu trả lời: Đó là viên đá đầu tiên của ngôi đền Trí tuệ.”`,
  },
  {
    id: 49,
    text: `“Logic sẽ đưa chúng ta từ điểm A tới điểm B. Trí tưởng tượng sẽ đưa chúng ta tới mọi nơi.”`,
  },
  {
    id: 50,
    text: `“Nếu con đi tìm Sự thật thì Sự thật sẽ bảo vệ con.”`,
  },
  {
    id: 51,
    text: `“Không đạt được những gì bạn mong muốn đôi khi lại là một may mắn tuyệt vời.”`,
  },
  {
    id: 52,
    text: `"Chỉ cần làm tốt. Đừng hỏi về con đường phía trước."`,
  },
  {
    id: 53,
    text: `Một tâm thức chấp trụ và phân biệt đã tạo ra thời gian và không gian hữu hạn, nghĩa là tạo ra sanh tử ta - người, đây - kia, đã qua - sắp tới, còn - mất, có - không...”`,
  },
  {
    id: 54,
    text: `"Không có một lý do chính đáng nào để tranh cãi với thực tại, bởi vì chúng ta sẽ không bao giờ chiến thắng trong cuộc chiến này."`,
  },
  {
    id: 55,
    text: `"Từ bỏ sự phán xét đối với người khác không có nghĩa là bạn sẽ không còn khả năng nhận ra được sự tha hóa hay thiếu hiểu biết của người khác khi bạn gặp phải những hành vì như thế. Đây chỉ là bạn "chọn làm một con người hiểu biết" hơn là một "con người hay phản ứng" hay một vị quan tòa.""`,
  },
  {
    id: 56,
    text: `“Khi bạn nghĩ rằng mọi sự do sai lầm của người khác, bạn sẽ nhiều khổ đau. Khi bạn nhận ra rằng mọi sự đều bắt nguồn từ chính mình, bạn sẽ học được cả hai bài học: bình yên và vui sướng.”`,
  },
  {
    id: 57,
    text: `"Tất cả mọi hoàn cảnh trong cuộc đời, dù tốt hay xấu, đều là những cơ hội để học hỏi.

    Có khả năng chấp nhận được sự không chắc chắn, và sống với nó là một dấu hiệu chắc chắn của sự trưởng thành.
    
    Chúng ta thường cứ muốn phải chắc chắn về tương lai. Chẳng cần như thế, cái gì đến, sẽ đến."`,
  },
  {
    id: 58,
    text: `“Khi tôi nói bạn cần sẵn sàng cho điều tồi tệ nhất, điều đó không có nghĩa là bạn cần phải có một quan điểm hay thái độ tiêu cực; chỉ đơn giản là bạn hãy gạt bỏ mọi kỳ vọng và mong đợi - hãy linh hoạt và sẵn sàng đón nhận bất cứ điều gì xảy đến.”`,
  },
  {
    id: 59,
    text: `"Khi đau đớn, khổ sở hay giận dữ xảy ra, đã đến lúc bạn phải nhìn vào bên trong chứ không phải nhìn xung quanh."`,
  },
  {
    id: 60,
    text: `"Bám luyến là cái đối địch nhất của yêu thương.
    Yêu thương nói: “Ta muốn bạn được hạnh phúc”.
    Bám luyến nói: “Ta muốn bạn làm cho ta hạnh phúc.”"`,
  },
  {
    id: 61,
    text: `“Vào mỗi buổi sáng, chúng ta được sinh ra một lần nữa. Những gì chúng ta làm trong ngày hôm nay mới là điều đáng quan tâm nhất.”`,
  },
  {
    id: 62,
    text: `“Đôi khi, thứ tốt nhất bạn có thể làm là không nghĩ ngợi, không ao ước, không tưởng tượng, không đuổi bắt. Bạn chỉ cần tập trung vào hơi thở và tin chắc rằng mọi chuyện vốn đều hoàn hảo.”`,
  },
  {
    id: 63,
    text: `“Thay vì bỏ công tìm kiếm cái mà bạn không có, hãy nhận ra cái mà bạn Chưa Bao Giờ Mất.”`,
  },
  {
    id: 64,
    text: `“Biến mình trở nên quyến rũ hơn trong mắt người khác có giúp bạn hạnh phúc hơn?

    Nói dối lòng mình để làm vừa lòng người bạn đời sẽ giúp bạn có thêm tình yêu?." 
    `,
  },
  {
    id: 65,
    text: `“Nếu bạn thích một bông hoa, đừng ngắt nó ra khỏi cành.
    Bởi vì nếu bạn ngắt nó, nó sẽ chết và không còn là bông hoa đẹp cho bạn ngắm nhìn nữa.
    Yêu thương không phải sở hữu.
    Mà yêu thương là trân trọng.”`,
  },
  {
    id: 66,
    text: `“Chú tâm đến sự công nhận của người khác rồi người sẽ trở thành tù nhân của chính họ."`,
  },
  {
    id: 67,
    text: `“Nếu biết vạn vật đều thay đổi, thì bản thân không nên cố nắm giữ điều chi.”`,
  },
  {
    id: 68,
    text: `“Trong thế giới phức tạp này, cách tốt nhất để sống được đó là hãy chân thành.”`,
  },
  {
    id: 69,
    text: `"Khi tôi chấp nhận chính tôi, tôi trút xuống gánh nặng mong cầu người khác chấp nhận mình."`,
  },
  {
    id: 70,
    text: `"Cuộc sống quá ngắn ngủi để mọi người kịp nhận ra sự nuối tiếc. Hãy trân trọng và yêu thương những người quý mến bạn và hãy tạm quên đi những người đối xử chưa tốt với bạn."`,
  },

  {
    id: 71,
    text: `“Tình yêu là bản chất của bạn. Tình yêu không tìm kiếm cái gì cả. Tình yêu tự nó là hoàn hảo. Tình yêu không muốn, không cần và cũng không phải làm gì cả. Tình yêu đã có tất cả những gì nó muốn. Tình yêu chính là tất cả những gì nó muốn, chỉ khác là cách nó muốn mà thôi. Vậy nên khi tôi nghe ai đó nói rằng họ yêu một người và muốn được người đó yêu lại, tôi biết là họ không nói đến tình yêu. Họ đang nói về một thứ khác.”`,
  },
  {
    id: 72,
    text: `“Hiểu biết của bạn về người khác bị hạn chế bởi những gì bạn cho rằng mình đã biết.”`,
  },
  {
    id: 73,
    text: `"Cái đẹp thực sự không ở trong sự hoàn hảo, mà ở trong sự chấp nhận và mở lòng ra với những bất toàn."`,
  },
  {
    id: 74,
    text: `"Bạn không thể làm dịu cơn bão. Hãy làm dịu chính mình. Rồi cơn bão sẽ qua đi."`,
  },
  {
    id: 75,
    text: `“Khi bạn ghét chính mình, bạn sẽ ghét tất cả mọi người. Đó là quy luật.”`,
  },
  {
    id: 76,
    text: `"Khi bạn muốn có thêm điều gì, bạn không thể vui hưởng điều mình đang có."`,
  },
  {
    id: 78,
    text: `“Vũ trụ không mang đến cho bạn người bạn muốn. Vũ trụ mang đến cho bạn người bạn cần. Người giúp đỡ bạn, làm tổn thương bạn, rời bỏ bạn, yêu thương bạn và tạo nên chính con người bạn.”`,
  },
  {
    id: 79,
    text: `"Khi bạn nói hay làm bất cứ việc gì để làm vừa lòng hay kiểm soát ai hay thứ gì đó, nỗi sợ là nguyên nhân và niềm đau là kết quả. Thao túng đồng nghĩa với chia ly, và chia ly thì rất đau khổ. Một người có thể yêu bạn hết mình trong khoảnh khắc đó và bạn không có cách nào để nhận được tình yêu, bởi bạn đang mắc kẹt với suy nghĩ về những gì bạn phải làm để nhận được tình yêu. Mọi suy nghĩ tiêu cực sẽ làm bạn xa cách với mọi người."`,
  },
  {
    id: 80,
    text: `"Những điều bạn nghĩ "đáng lẽ không nên xảy ra" chính là những điều "nên xảy ra". Nó nên xảy ra vì nó đã xảy ra rồi. Không có suy nghĩ nào thay đổi được điều đó. Điều này không có nghĩa là bạn bỏ qua hay chịu đựng nó, mà có nghĩa là bạn có thể nhìn nhận mọi việc khi không còn sự kháng cự hay sự hỗn loạn bên trong bạn. Không ai muốn con của mình đau bệnh. Không ai muốn bị tai nạn giao thông. Nhưng khi điều đó xảy ra, liệu tranh cãi với thực tại thì có ích gì?."`,
  },
  {
    id: 81,
    text: `“Đôi khi bạn có ấn tượng đầu tiên rất tốt về người nào đó.
    Nhưng chưa được bao lâu thì mối quan hệ giữa bạn và người đó nhanh chóng trở nên xấu đi.
    Đó là vì khi mới gặp, bạn đã không nhìn người đó như chính con người thật của họ.
    Mà chỉ thấy sự kỳ vọng và tưởng tượng của mình đắp lên họ mà thôi.”`,
  },
  {
    id: 82,
    text: `“Suy nghĩ luôn vô hại, trừ khi ta tin nó là thật. Vấn đề không nằm ở suy nghĩ của ta, mà ở cách chúng ta bám chấp vào suy nghĩ của mình. Đó mới chính là điều gây ra đau khổ. Bám chấp vào một suy nghĩ là mặc định rằng nó đúng, mà không hề kiểm tra lại. Một niềm tin thường là một suy nghĩ gắn với ta trong nhiều năm liền.”`,
  },
  {
    id: 83,
    text: `“Biết cô đơn chính là biết yêu người. Nghe có vẻ nghịch lý, nhưng đúng là thế. Một sự thật không thể chối cãi là, chỉ những người có khả năng ở trong cô độc mới có năng lực yêu, năng lực chia sẻ, năng lực đi đến tận cùng nội tâm của người khác mà không sở hữu người khác, không phụ thuộc vào người khác, không biến người khác thành món đồ, và không chìm đắm vào người khác.

    Họ cho phép người khác được tự do tuyệt đối, bởi vì họ biết rằng nếu người đó bỏ đi, họ vẫn sẽ hạnh phúc. Họ không sợ hãi sự cô đơn. Họ có khả năng hạnh phúc với chính mình. Niềm hạnh phúc của họ không thể bị tước đoạt bởi vì nó chưa từng được vay mượn từ bất cứ ai.”`,
  },
  {
    id: 84,
    text: `“Một con chim đậu trên cành cây, không bao giờ sợ cành cây bị gãy. Bởi vì niềm tin của con chim đặt ở đôi cánh của nó chứ không phải ở cành cây.
    Vì thế, dù bạn đang đứng trong hoàn cảnh nào, hãy luôn tin tưởng vào chính bản thân mình.”`,
  },
  {
    id: 85,
    text: `“Quen một người cần dựa vào DUYÊN PHẬN.

    Hiểu một người cần dựa vào SỰ NHẪN NẠI.
    
    Chinh phục một người cần dựa vào TRÍ TUỆ.
    
    Chung sống với một người cần dựa vào LÒNG BAO DUNG.”`,
  },
  {
    id: 86,
    text: `"Không ai và chẳng có gì có thể giải thoát cho bạn. Chỉ có sự hiểu biết của chính bạn mới giải thoát cho bạn mà thôi.”`,
  },
  {
    id: 87,
    text: `"Đừng bắt ép một người vào khuôn khổ bạn muốn họ phải thế. Con người tuyệt vời nhất khi là chính họ."`,
  },
  {
    id: 88,
    text: `"Trước hết phải thành thật với chính bản thân mình, rạch ròi như đêm với ngày, sau đó, bạn mới có thể sống chân thành với người khác."`,
  },
  {
    id: 89,
    text: `“Kiếp sau có khi tới sớm hơn ngày mai.”`,
  },
];
const DATA_CONTENT_1 = [
  {
    id: 0,
    text: `Khi bạn nhìn vào một thân cây hay một con người, từ sự tĩnh lặng ở trong bạn, thì ai đang nhìn vậy? Có một cái gì đó, sâu hơn là con người của bạn, đang nhìn. Đó là Tâm đang nhìn vào cái vật mà chính Tâm đã sáng tạo ra.
    - Trích sách "Sức mạnh của tĩnh lặng", Eckhart Tolle -`,
  },
  {
    id: 1,
    text: `“Nếu bạn tin rằng bạn chỉ là thân tâm này, bạn sẽ chết!
    Nhưng khi bạn khám phá ra rằng bạn chính là Nhận Biết thì chuyện sinh tử chẳng bận lòng bạn nữa.”
    
    - Mooji - `,
  },
  {
    id: 2,
    text: `"Khi bên trong con có một cảm xúc tiêu cực nổ ra thì hãy thấu hiểu nó thay vì đánh nhau với nó. Tất cả các cảm xúc tiêu cực đều đến từ nỗi sợ một kết quả tiêu cực nào đó. Hãy cho cảm xúc đó xảy ra bất kể lý do gì, vì khi con cho nó xảy ra con mới thấy được bản chất của nó."

    - Trích: “Bí kíp mọi thứ luôn hoàn hảo” - Trong Suốt -`,
  },
  {
    id: 3,
    text: `“Chúng ta cần học cách nghỉ ngơi và thư giãn. Nó giúp ta phòng chống bệnh tật và giảm ngừa căng thẳng. Nó giúp ta có tâm trí sáng suốt để tập trung giải quyết các vấn đề.”

    - Thích Nhất Hạnh - `,
  },
  {
    id: 4,
    text: `Nhớ rằng tôi sẽ chết, đó là công cụ quan trọng nhất tôi từng có để giúp mình thực hiện những lựa chọn lớn trong cuộc đời. Bởi vì hầu hết tất cả mọi thứ - tất cả những hy vọng phù phiếm, lòng kiêu hãnh, nỗi sợ mất mặt hay thất bại - tất cả những thứ này sẽ mờ nhạt đi khi ta đối diện với cái chết, chỉ để lại điều gì thật sự quan trọng.

    Nhớ rằng bạn sẽ chết, đó là cách tốt nhất tôi biết để tránh cái bẫy suy nghĩ rằng bạn vẫn còn thứ để mất. Bạn thực chất chẳng có gì. Không có lí do để không đi theo trái tim.
    
    - Steve Jobs - `,
  },
  {
    id: 5,
    text: `"Khi bạn thật sự hiểu rằng bạn chỉ là một mảnh nhỏ của sự sống trong một vũ trụ bất tận, bạn sẽ tự nhiên cúi đầu trước mọi thứ."

    - Sadhguru -`,
  },
  {
    id: 6,
    text: `Đừng lo cho ngày mai. Hãy để ngày mai mai lo. Hãy để lo lắng ngày nào đủ cho ngày ấy.”

    - Trích đoạn phim: “Chúa Jesus ở thành Narazeth”
    Đạo diễn Franco Zeffirells -`,
  },
  {
    id: 7,
    text: `"Nếu một việc gì đến mà ta không dũng cảm giải quyết cho tới nơi tới chốn, nó nhất định sẽ trở lại. Cuộc sống là vậy, nó sẽ lần lượt bắt mình thực hành mãi một bài học, cho đến khi thành thục mới thôi."

    - Sưu tầm -`,
  },
  {
    id: 8,
    text: `Chúng ta thường đánh giá thấp sức mạnh của nụ cười, của lời tử tế, của sự vỗ về, của tâm lắng nghe, của lời khen ngợi chân thành, hoặc một cử chỉ săn sóc rất nhỏ. Tất cả những điều ấy đều ẩn chứa khả năng thay đổi một cuộc đời.

    - Giáo sư Leo Buscaglia -`,
  },
  {
    id: 9,
    text: "Khôn ngoan chỉ đến qua con đường đau khổ. Có lẽ điều gì bắt trái tim ta tan nát chính là điều giúp trái tim rộng mở. Đau khổ giúp ta rất nhiều, nếu ta chấp nhận bài học mà đau khổ mang đến. Có lẽ chính thử thách lớn nhất trong đời sẽ ban tặng cơ hội lớn nhất.",
  },
  {
    id: 10,
    text: `"Mỗi khi bạn phán xét ai đó là bạn tiết lộ một phần của bản thân cần được chữa lành."

    - Joy Marino -`,
  },
  {
    id: 11,
    text: "Tuỳ duyên không phải là phó mặc. Tuỳ duyên là vẫn làm điều mình cho là phù hợp nhất nhưng trong lòng chấp nhận rằng: đủ duyên thì ra kết quả, còn không đủ duyên thì thôi.",
  },
  {
    id: 12,
    text: `Khi bạn nhìn vào một thân cây hay một con người, từ sự tĩnh lặng ở trong bạn, thì ai đang nhìn vậy? Có một cái gì đó, sâu hơn là con người của bạn, đang nhìn. Đó là Tâm đang nhìn vào cái vật mà chính Tâm đã sáng tạo ra.
    - Trích sách "Sức mạnh của tĩnh lặng", Eckhart Tolle -`,
  },
  {
    id: 13,
    text: `“Bạn không phải là cái tâm này.

    Nếu bạn biết bạn không phải là cái tâm này, thì có gì khác biệt đâu khi cái tâm đó chộn rộn hoặc tĩnh lặng?
    
    Bạn không phải là cái tâm này.”
    
    - Nisargadatta -`,
  },
  {
    id: 14,
    text: `“Can đảm không phải là không biết sợ. Cam đảm là biết chấp nhận, dấn thân và vượt qua bất chấp mọi nỗi sợ.
    Cam đảm không có nghĩa là theo đuổi không ngừng, mà là biết từ bỏ những thứ quá quen thuộc nhưng không còn phù hợp.
    Con đường can đảm là con đường của trái tim.”
    
    - Osho -`,
  },
  {
    id: 14,
    text: `"Nghĩ về tình yêu thì rất dễ, còn yêu thì rất khó. Rất dễ để yêu cả thế giới, còn yêu một người cụ thể thì khó vô cùng."

    - Osho -
    `,
  },
  {
    id: 14,
    text: `"Ngày xửa ngày xưa, một người đàn ông bị mất chiếc rìu nghi là con của người hàng xóm. Cậu bé bước đi như một tên trộm, trông như một tên trộm và nói năng như một tên trộm. Nhưng người đàn ông đã tìm thấy chiếc rìu của mình khi đang đào trong thung lũng, và lần sau khi nhìn thấy con trai hàng xóm, cậu bé đi lại, nhìn và nói như bao đứa trẻ khác."

    - Lão Tử -`,
  },
  {
    id: 14,
    text: `“Bất cứ khi nào bạn cảm thấy bất ổn, điều đó có nghĩa là bạn đã xa rời thực tại. Bất cứ khi nào bạn ở gần thực tại - thì vô cùng yên ổn, bình thản, yên tĩnh, ân huệ, im lặng, bình an. Bạn đang ở nhà bởi lẽ thực tại là ngôi nhà của bạn.”

    - Osho -`,
  },
  {
    id: 14,
    text: `"Sự từ chối một cái đang là là nguyên nhân của khổ. Con khổ không phải vì điều đấy mà vì con từ chối điều đấy."

    - Trong Suốt -`,
  },
  {
    id: 14,
    text: `“Không hoàn hảo thì cũng chẳng sao đâu, vạn vậy trên đời đều có vết nứt, đó là nơi ánh sáng sẽ chiếu vào.”

    - Nguồn: Chill Radio -`,
  },
  {
    id: 14,
    text: `"Chúng ta mang bên trong mình những điều kỳ diệu mà chúng ta tìm kiếm bên ngoài chúng ta."

    - Rumi -`,
  },
  {
    id: 14,
    text: `Thực tại luôn luôn thật với chính nó. Khi hòa hợp với thực tại, bạn sẽ trải nghiệm hạnh phúc. Khi không hòa hợp với nó, lập tức bạn trải nghiệm nỗi đau. Đây là quy luật của vũ trụ; là cách mọi thứ diễn ra. Không ai thoát khỏi quy luật này. Đối với tôi, hiểu biết này là một ân huệ. Thực tại là bất biến. Tranh cãi với nó, chống lại nó, thì nó sẽ gây tổn thương - lần nào cũng vậy. Nó sẽ làm tổn thương bạn, làm tổn thương người khác, và nó sẽ góp phần vào xung đột chung của tất thảy chúng sinh.

    -Trích sách "Sự thực về Giác ngộ", Adyashanti -`,
  },
  {
    id: 14,
    text: `Đừng nên vội vàng tìm câu trả lời cho cuộc sống;
    Đừng nên vội vàng mong muốn cuộc sống sẽ cho bạn biết hết các câu trả lời;
    Đôi khi, bạn cần phải kiên nhẫn chờ đợi.
    
    - Sưu tầm -`,
  },
  {
    id: 14,
    text: `Bản chất mọi đau khổ
    Do suy nghĩ mà ra
    Chớ vội tin đúng - thật
    Lập tức nhẹ hồn ta. - Minh Canh -`,
  },
  {
    id: 14,
    text: `“Bất kể điều gì làm phiền bạn, bất kể điều gì làm bạn khó chịu, đó là thầy của bạn.”

    - Ajahn Chah -`,
  },
  {
    id: 14,
    text: `"Nguyên nhân chính của bất hạnh không bao giờ là hoàn cảnh mà là suy nghĩ của bạn về nó."

    - Eckhart Tolle -`,
  },
  {
    id: 14,
    text: `Đối đầu với cuộc sống. Gặp gỡ cuộc sống. Những khoảnh khắc khó khăn sẽ có nhưng một ngày bạn sẽ thấy rằng những khoảnh khắc khó khăn đó đã cho bạn sức mạnh vì bạn đã gặp phải chúng.Nếu không có chúng, bạn sẽ không bao giờ được định tâm, được bắt rễ."

    - Osho - Sách: Nghệ thuật chết - `,
  },
  {
    id: 14,
    text: `"Bạn không đau khổ vì mọi thứ là vô thường. Bạn đau khổ vì mọi thứ là vô thường và bạn nghĩ rằng chúng là vĩnh viễn."

    - Thích Nhất Hạnh `,
  },
  {
    id: 14,
    text: `“Hãy cảm ơn những lúc bạn gặp khó khăn, bởi nếu không có khó khăn, bạn sẽ không có cơ hội để hiểu mình và trải nghiệm cuộc sống.”

    - Sưu tầm -`,
  },
  {
    id: 14,
    text: `Tâm bất an: Đó là khi chúng ta không biết trân trọng những gì mình đang có, để rồi nuối tiếc khi mất đi những gì mình đã có.

    Tâm an lạc: Đó là khi chúng ta biết hài lòng với những gì mình đang có, dù vậy, vẫn chấp nhận khi mọi sự đổi thay.
    
    - Đức Nhiếp Chính Vương Gyalwa Dokhampa -`,
  },
  {
    id: 14,
    text: `Nhẫn nại là một đức tính tốt cần rèn luyện. Nhẫn nại không có nghĩa là để cho người khác lấn áp hay tự do lạm dụng bạn; mà có nghĩa là hãy bình tĩnh để diễn đạt mình một cách hữu hiệu và đúng lúc, đúng nơi, đúng lời, đúng việc. - Thiền sư Bhate Henepola Gunaratana -`,
  },
  {
    id: 14,
    text: `"Muốn bình an cũng là một loại bất an, muốn càng nhiều thì bất an càng tăng."

    - Trong Suốt -`,
  },
  {
    id: 14,
    text: `“Thân thể này vô thường. Tâm này cũng vô thường. Mọi tướng, mọi trạng thái, mọi tình trạng tâm, bất kỳ cảm xúc hay suy nghĩ nào cũng vô thường cả.￼ Tức là tự đến rồi tự biến đổi, tự biến mất. Khi thấy rõ như thế thì sẽ tự không dính mắc, níu kéo bất cứ điều gì, dù là thân, tâm, hay mọi thứ trong cuộc sống. Ngay kể cả khi ta ngồi thiền, nhập vào trạng thái định sâu và thấy rất hỉ lạc thì nó cũng không kéo dài mãi. Nó cũng vô thường. Nó sẽ phải thay đổi.￼”

    - Trích sách “Trái Tim Không - Cuộc đời và thơ của thiền sư Yantra Amaro￼”, Phan Việt -`,
  },
  {
    id: 14,
    text: `“Một người tức giận là do không giải quyết được những đau buồn của mình. Họ là nạn nhân đầu tiên của sự đau buồn đó, còn bạn là người thứ hai. Hiểu được điều này, lòng tư bi sẽ nảy nở trong tim và sự tức giận sẽ tan biến. Đừng trừng phạt họ, thay vào đó, hãy nói gì đó, làm gì đó để vơi bớt nỗi đau buồn.”

    - Thích Nhất Hạnh `,
  },
  {
    id: 14,
    text: `Đời dạy ta muôn ngàn cách Nắm giữ,
    Đạo dạy người chỉ một chữ Buông.”
    
    - Thích Chánh Định - `,
  },
  {
    id: 14,
    text: `“Đừng nhìn ra bên ngoài để tìm kiếm khoái cảm hay sự thỏa mãn, hay sự phê chuẩn, ổn định, hay tình yêu – bạn có một kho báu bên trong lớn hơn vô hạn lần so với bất cứ thứ gì mà thế giới có thể cung cấp.”

    - Eckhart Tolle -`,
  },
  {
    id: 14,
    text: `“Những mầm mống khổ đau trong bạn có thể thật mạnh mẽ, nhưng đừng đợi cho đến khi mọi khổ đau đi hết rồi mới cho phép mình được hạnh phúc.”

    - Thích Nhất Hạnh -`,
  },
  {
    id: 14,
    text: `“Nghĩ về quá khứ và tương lai là không sai. Sai là đắm chìm trong quá khứ và tương lai mà quên mất thực tại đang là." - Hoà Thượng Viên Minh -`,
  },
  {
    id: 14,
    text: `"Hạnh phúc là một loại đau khổ vi tế. Bởi chỉ mong muốn điều hạnh phúc, dễ chịu là còn khổ, còn bám víu vào hạnh phúc là còn khổ.

    Đau khổ là một loại phước báu vi tế. Đau khổ càng lớn thì món quà càng to. Bởi nhận ra đau khổ làm bạn không còn muốn bám víu, không còn muốn dính mắc tâm bạn vào nó. Không còn dính mắc thì bạn được tự do.
    
    Hạnh phúc chưa hẳn đã tốt. Đau khổ chưa hẳn là không tốt. Đúng - sai, tốt - xấu: tất cả chỉ là tương đối. Vượt trên cả hạnh phúc và đau khổ, bạn sẽ tìm lại (ngộ ra) chính mình."
    
    - Sưu tầm - `,
  },
  {
    id: 14,
    text: `5 NGUYÊN TẮC ĐỂ HẠNH PHÚC:

    1. Tập tha thứ
    2. Bớt lo lắng
    3. Sống đơn giản
    4. Cho đi nhiều hơn
    5. Đừng trông đợi quá nhiều.
    
    - Sưu tầm -`,
  },
  {
    id: 14,
    text: `“Không nên xem con đường tâm linh như là niềm vui thích hay thứ gì đó cao sang, mà nên xem nó như là việc đối mặt với sự thật về cuộc sống.”

    - Chögyam Trungpa -`,
  },
  {
    id: 14,
    text: `“Nếu bạn không có được điều bạn muốn có nghĩa là cái gì đó tốt đẹp hơn đang đến.”

    - Sưu tầm`,
  },
  {
    id: 14,
    text: `"Không ai có thể quay ngược lại thời gian để bắt đầu lại từ đầu, nhưng bất kì ai cũng có thể bắt đầu từ ngày hôm nay và tạo ra một kết thúc mới.”

    - Sưu tầm -`,
  },
  {
    id: 14,
    text: `Những suy nghĩ tiêu cực chỉ có thể mang lại cho bạn một cuộc sống bất lực.

    Những suy nghĩ tích cực chỉ có thể mang lại cho bạn một cuộc sống đỡ bực.
    
    Khi thấy rõ mọi điều mà không còn thấy điều gì tiêu cực hay tích cực,
    Bạn sẽ an nhiên và đùa nghịch giữa muôn trùng cuộn sóng của cuộc đời.
    
    - Trong Suốt -`,
  },
  {
    id: 14,
    text: `"Tha thứ có nghĩa là chúng ta thả một người ra khỏi nhà tù, và thật ngạc nhiên, khi thấy chính mình là người tù này" - Lewis B.Smedes`,
  },
  {
    id: 14,
    text: `“Bạn chỉ đẹp khi là chính bạn. Bạn đâu cần sự công nhận của người khác. Bạn chỉ cần chấp nhận chính mình mà thôi.”

    - Thích Nhất Hạnh -`,
  },
  {
    id: 14,
    text: `"Sự thật là trong cuộc sống mọi thứ đều thay đổi – dù bạn muốn hay không, dù bạn có ngồi bên bờ sông mà ước rằng “sông ơi hãy ngừng chảy, mùa ơi thôi đừng đi, hoa ơi xin đừng tàn, tuổi trẻ đừng giã biệt, tuổi già xin đừng đến, cuộc đời ơi xin chớ đưa ta đến nấm mồ”." - Trích sách "Cỏ tự nó mọc lên" - Osho -`,
  },
  {
    id: 14,
    text: `“Nếu bạn muốn thành công, hãy tôn trọng một quy luật: Đừng bao giờ nói dối chính mình.”

    - Paulo Coelho -`,
  },
  {
    id: 14,
    text: `CHẤP NHẬN

    Khi ai đó chê trách bạn, hãy bình tâm lắng nghe. Khoan vội cắt lời họ và biện hộ cho mình.
    
    Nếu lời chê trách ấy đúng, đồng ý, xin lỗi và tìm xem bạn có thể làm gì để thay đổi.
    
    Nếu lời chê trách ấy là sai, vui vẻ nói: “Một ý hay, nhưng tôi có quan điểm của riêng mình.”
    
    - Sưu tầm -`,
  },
  {
    id: 14,
    text: `“Nếu bạn được hỏi: Im lặng là gì?
    Câu trả lời: Đó là viên đá đầu tiên của ngôi đền Trí tuệ.”
    
    - Pythagoras -`,
  },
  {
    id: 14,
    text: `“Logic sẽ đưa chúng ta từ điểm A tới điểm B. Trí tưởng tượng sẽ đưa chúng ta tới mọi nơi.”

    - Albert Einstein -`,
  },
  {
    id: 14,
    text: `“Nếu con đi tìm Sự thật thì Sự thật sẽ bảo vệ con.”

    - Trích phim: “Bố tớ là chân to” -`,
  },
  {
    id: 14,
    text: `“Không đạt được những gì bạn mong muốn đôi khi lại là một may mắn tuyệt vời.”

    - Đức Đạt Lai Lạt Ma `,
  },
  {
    id: 14,
    text: `"Chỉ cần làm tốt. Đừng hỏi về con đường phía trước."

    - Zen Proverb- `,
  },
  {
    id: 14,
    text: `Một tâm thức chấp trụ và phân biệt đã tạo ra thời gian và không gian hữu hạn, nghĩa là tạo ra sanh tử ta - người, đây - kia, đã qua - sắp tới, còn - mất, có - không...”

    - Trích sách: “Thực hành con đường Bồ Tát qua kinh Duy Ma Cật”`,
  },
  {
    id: 14,
    text: `"Không có một lý do chính đáng nào để tranh cãi với thực tại, bởi vì chúng ta sẽ không bao giờ chiến thắng trong cuộc chiến này."

    - Trích: “Sự thật về giác ngộ”, Adyashanti -`,
  },
  {
    id: 14,
    text: `Từ bỏ sự phán xét đối với người khác không có nghĩa là bạn sẽ không còn khả năng nhận ra được sự tha hóa hay thiếu hiểu biết của người khác khi bạn gặp phải những hành vì như thế. Đây chỉ là bạn "chọn làm một con người hiểu biết" hơn là một "con người hay phản ứng" hay một vị quan tòa."

    - Trích: “Sức mạnh của hiện tại”, Eckhart Tolle -`,
  },
  {
    id: 14,
    text: `“Khi bạn nghĩ rằng mọi sự do sai lầm của người khác, bạn sẽ nhiều khổ đau. Khi bạn nhận ra rằng mọi sự đều bắt nguồn từ chính mình, bạn sẽ học được cả hai bài học: bình yên và vui sướng.”

    - Dalai Lama -`,
  },
  {
    id: 14,
    text: `Tất cả mọi hoàn cảnh trong cuộc đời, dù tốt hay xấu, đều là những cơ hội để học hỏi.

    Có khả năng chấp nhận được sự không chắc chắn, và sống với nó là một dấu hiệu chắc chắn của sự trưởng thành.
    
    Chúng ta thường cứ muốn phải chắc chắn về tương lai. Chẳng cần như thế, cái gì đến, sẽ đến.
    
    - Thiền sư Sayadaw U Jotika -`,
  },
  {
    id: 14,
    text: `“Khi tôi nói bạn cần sẵn sàng cho điều tồi tệ nhất, điều đó không có nghĩa là bạn cần phải có một quan điểm hay thái độ tiêu cực; chỉ đơn giản là bạn hãy gạt bỏ mọi kỳ vọng và mong đợi - hãy linh hoạt và sẵn sàng đón nhận bất cứ điều gì xảy đến.”

    - Đức Pháp Vương Gyalwang Drukpa -`,
  },
  {
    id: 14,
    text: `Khi đau đớn, khổ sở hay giận dữ xảy ra, đã đến lúc bạn phải nhìn vào bên trong chứ không phải nhìn xung quanh.

    - Sadhguru -`,
  },
  {
    id: 14,
    text: `Bám luyến là cái đối địch nhất của yêu thương.
    Yêu thương nói: “Ta muốn bạn được hạnh phúc”.
    Bám luyến nói: “Ta muốn bạn làm cho ta hạnh phúc”.
    
    - Tenzin Palmo -`,
  },
  {
    id: 14,
    text: `“Vào mỗi buổi sáng, chúng ta được sinh ra một lần nữa. Những gì chúng ta làm trong ngày hôm nay mới là điều đáng quan tâm nhất.”

    - Lời Phật dạy - `,
  },
  {
    id: 14,
    text: `“Đôi khi, thứ tốt nhất bạn có thể làm là không nghĩ ngợi, không ao ước, không tưởng tượng, không đuổi bắt. Bạn chỉ cần tập trung vào hơi thở và tin chắc rằng mọi chuyện vốn đều hoàn hảo.”

    - Sưu tầm -`,
  },
  {
    id: 14,
    text: `“Thay vì bỏ công tìm kiếm cái mà bạn không có, hãy nhận ra cái mà bạn Chưa Bao Giờ Mất.”

    - Trích: “I Am That” - S.N. Maharaj -`,
  },
  {
    id: 14,
    text: `“Biến mình trở nên quyến rũ hơn trong mắt người khác có giúp bạn hạnh phúc hơn?

    Nói dối lòng mình để làm vừa lòng người bạn đời sẽ giúp bạn có thêm tình yêu?" - Nguồn: sách “Đi tìm tình yêu” - Tác giả: Byron Katie - 
    `,
  },
  {
    id: 14,
    text: `“Nếu bạn thích một bông hoa, đừng ngắt nó ra khỏi cành.
    Bởi vì nếu bạn ngắt nó, nó sẽ chết và không còn là bông hoa đẹp cho bạn ngắm nhìn nữa.
    Yêu thương không phải sở hữu.
    Mà yêu thương là trân trọng.”
    
    - Osho -`,
  },
  {
    id: 14,
    text: `“Chú tâm đến sự công nhận của người khác rồi người sẽ trở thành tù nhân của chính họ.”

    - Lão Tử -`,
  },
  {
    id: 14,
    text: `“Nếu biết vạn vật đều thay đổi, thì bản thân không nên cố nắm giữ điều chi.”

    - Lão Tử -`,
  },
  {
    id: 14,
    text: `“Trong thế giới phức tạp này, cách tốt nhất để sống được đó là hãy chân thành.”

    - Sogyal Rinpoche -`,
  },
  {
    id: 14,
    text: `"Khi tôi chấp nhận chính tôi, tôi trút xuống gánh nặng mong cầu người khác chấp nhận mình."

    - Sưu tầm -`,
  },
  {
    id: 14,
    text: `" Cuộc sống quá ngắn ngủi để mọi người kịp nhận ra sự nuối tiếc. Hãy trân trọng và yêu thương những người quý mến bạn và hãy tạm quên đi những người đối xử chưa tốt với bạn."

    - Sưu tầm -`,
  },

  {
    id: 14,
    text: `“Tình yêu là bản chất của bạn. Tình yêu không tìm kiếm cái gì cả. Tình yêu tự nó là hoàn hảo. Tình yêu không muốn, không cần và cũng không phải làm gì cả. Tình yêu đã có tất cả những gì nó muốn. Tình yêu chính là tất cả những gì nó muốn, chỉ khác là cách nó muốn mà thôi. Vậy nên khi tôi nghe ai đó nói rằng họ yêu một người và muốn được người đó yêu lại, tôi biết là họ không nói đến tình yêu. Họ đang nói về một thứ khác.”

    - Byron Katie `,
  },
  {
    id: 14,
    text: `“Hiểu biết của bạn về người khác bị hạn chế bởi những gì bạn cho rằng mình đã biết.”

    - Byron Katie -`,
  },
  {
    id: 14,
    text: `"Cái đẹp thực sự không ở trong sự hoàn hảo, mà ở trong sự chấp nhận và mở lòng ra với những bất toàn."

    - Ajahn Brahm -`,
  },
  {
    id: 14,
    text: `"Bạn không thể làm dịu cơn bão. Hãy làm dịu chính mình. Rồi cơn bão sẽ qua đi."

    - Sưu tầm -`,
  },
  {
    id: 14,
    text: `“Khi bạn ghét chính mình, bạn sẽ ghét tất cả mọi người. Đó là quy luật.”

    - Byron Katie -`,
  },
  {
    id: 14,
    text: `"Khi bạn muốn có thêm điều gì, bạn không thể vui hưởng điều mình đang có."

    - Ajahn Brahm -`,
  },
  {
    id: 14,
    text: `“Vũ trụ không mang đến cho bạn người bạn muốn. Vũ trụ mang đến cho bạn người bạn cần. Người giúp đỡ bạn, làm tổn thương bạn, rời bỏ bạn, yêu thương bạn và tạo nên chính con người bạn.”

    - Nguồn: Spiritual League `,
  },
  {
    id: 14,
    text: `"Khi bạn nói hay làm bất cứ việc gì để làm vừa lòng hay kiểm soát ai hay thứ gì đó, nỗi sợ là nguyên nhân và niềm đau là kết quả. Thao túng đồng nghĩa với chia ly, và chia ly thì rất đau khổ. Một người có thể yêu bạn hết mình trong khoảnh khắc đó và bạn không có cách nào để nhận được tình yêu, bởi bạn đang mắc kẹt với suy nghĩ về những gì bạn phải làm để nhận được tình yêu. Mọi suy nghĩ tiêu cực sẽ làm bạn xa cách với mọi người." - Trích: “Đi Tìm Tình Yêu” - Byron Katie -`,
  },
  {
    id: 14,
    text: `"Những điều bạn nghĩ "đáng lẽ không nên xảy ra" chính là những điều "nên xảy ra". Nó nên xảy ra vì nó đã xảy ra rồi. Không có suy nghĩ nào thay đổi được điều đó. Điều này không có nghĩa là bạn bỏ qua hay chịu đựng nó, mà có nghĩa là bạn có thể nhìn nhận mọi việc khi không còn sự kháng cự hay sự hỗn loạn bên trong bạn. Không ai muốn con của mình đau bệnh. Không ai muốn bị tai nạn giao thông. Nhưng khi điều đó xảy ra, liệu tranh cãi với thực tại thì có ích gì?." - Trích "Yêu thương thực tại, bỏ lại nỗi đau" - Byron Katie - `,
  },
  {
    id: 14,
    text: `“Đôi khi bạn có ấn tượng đầu tiên rất tốt về người nào đó.
    Nhưng chưa được bao lâu thì mối quan hệ giữa bạn và người đó nhanh chóng trở nên xấu đi.
    Đó là vì khi mới gặp, bạn đã không nhìn người đó như chính con người thật của họ.
    Mà chỉ thấy sự kỳ vọng và tưởng tượng của mình đắp lên họ mà thôi￼.”
    
    - Trích “Yêu những điều không hoàn hảo”, Hae Min`,
  },
  {
    id: 14,
    text: `“Suy nghĩ luôn vô hại, trừ khi ta tin nó là thật. Vấn đề không nằm ở suy nghĩ của ta, mà ở cách chúng ta bám chấp vào suy nghĩ của mình. Đó mới chính là điều gây ra đau khổ. Bám chấp vào một suy nghĩ là mặc định rằng nó đúng, mà không hề kiểm tra lại. Một niềm tin thường là một suy nghĩ gắn với ta trong nhiều năm liền.”

    - Byron Katie -`,
  },
  {
    id: 14,
    text: `“Biết cô đơn chính là biết yêu người. Nghe có vẻ nghịch lý, nhưng đúng là thế. Một sự thật không thể chối cãi là, chỉ những người có khả năng ở trong cô độc mới có năng lực yêu, năng lực chia sẻ, năng lực đi đến tận cùng nội tâm của người khác mà không sở hữu người khác, không phụ thuộc vào người khác, không biến người khác thành món đồ, và không chìm đắm vào người khác.

    Họ cho phép người khác được tự do tuyệt đối, bởi vì họ biết rằng nếu người đó bỏ đi, họ vẫn sẽ hạnh phúc. Họ không sợ hãi sự cô đơn. Họ có khả năng hạnh phúc với chính mình. Niềm hạnh phúc của họ không thể bị tước đoạt bởi vì nó chưa từng được vay mượn từ bất cứ ai.”
    
    - Osho -`,
  },
  {
    id: 14,
    text: `“Một con chim đậu trên cành cây, không bao giờ sợ cành cây bị gãy. Bởi vì niềm tin của con chim đặt ở đôi cánh của nó chứ không phải ở cành cây.
    Vì thế, dù bạn đang đứng trong hoàn cảnh nào, hãy luôn tin tưởng vào chính bản thân mình.”
    
    - Sưu tầm `,
  },
  {
    id: 14,
    text: `“Quen một người cần dựa vào DUYÊN PHẬN.

    Hiểu một người cần dựa vào SỰ NHẪN NẠI.
    
    Chinh phục một người cần dựa vào TRÍ TUỆ.
    
    Chung sống với một người cần dựa vào LÒNG BAO DUNG.”
    
    - Sưu tầm -`,
  },
  {
    id: 14,
    text: `"Không ai và chẳng có gì có thể giải thoát cho bạn. Chỉ có sự hiểu biết của chính bạn mới giải thoát cho bạn mà thôi.”

    - Thiền sư Ajahn Chah -`,
  },
  {
    id: 14,
    text: `"Đừng bắt ép một người vào khuôn khổ bạn muốn họ phải thế. Con người tuyệt vời nhất khi là chính họ."

    - Albert Einstein -`,
  },
  {
    id: 14,
    text: `"Trước hết phải thành thật với chính bản thân mình, rạch ròi như đêm với ngày, sau đó, bạn mới có thể sống chân thành với người khác."

    - William Shakespeare -`,
  },
  {
    id: 14,
    text: `“Kiếp sau có khi tới sớm hơn ngày mai.”

    - Danh ngôn Tây Tạng -`,
  },
];
const DATA_BUTTON = [
  {
    id: 0,
    text: "Xin quẻ nè",
  },
  {
    id: 1,
    text: "Xin quẻ nè",
  },
  {
    id: 2,
    text: "Gét Gô",
  },
];

const DATA_ANIMATIONS = [
  {
    id: 0,
    url: "https://media.giphy.com/media/xTiTnet7xRv1GPTShi/giphy.gif",
  },
  {
    id: 1,
    url: "https://media.giphy.com/media/xTiTnet7xRv1GPTShi/giphy.gif",
  },
  {
    id: 2,
    url: "https://media.giphy.com/media/7kn27lnYSAE9O/giphy.gif",
  },

  {
    id: 3,
    url: "https://media.giphy.com/media/S3sc3Pg9dFpUA/giphy.gif",
  },
  {
    id: 4,
    url: "https://media.giphy.com/media/xTiTnet7xRv1GPTShi/giphy.gif",
  },
];
