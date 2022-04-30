import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [text, setText] = useState(DATA_CONTENT[0].text);
  const [textButton, setTextButton] = useState(DATA_BUTTON[0].text);
  const [bg, setBg] = useState("");

  const randomText = () => {
    const numberRandom = Math.floor(Math.random() * 10) + 1;
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
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={styles.base}
        style={{
          background: `url(${bg})`,
        }}
      >
        <div className={styles.content}>
          <div className={styles.text}>{text}</div>
          <div className={styles.btnContainer}>
            <div className={styles.buttonText} onClick={() => randomText()}>
              {textButton}
            </div>
          </div>
        </div>
        <div className={styles.changBG}>
          <div
            className={styles.buttonRandomAnimation}
            onClick={() => changeBg()}
          />
          <div className={styles.buttonChangeBG} onClick={() => changeBg()} />
          <div className={styles.buttonIDontKnow} onClick={() => changeBg()} />
        </div>
      </div>
    </div>
  );
};

export default Home;

const DATA_CONTENT = [
  {
    id: 0,
    text: "Khi bạn nhìn vào một thân cây hay một con người, từ sự tĩnh lặng ở trong bạn, thì ai đang nhìn vậy? Có một cái gì đó, sâu hơn là con người của bạn, đang nhìn. Đó là Tâm đang nhìn vào cái vật mà chính Tâm đã sáng tạo ra.",
  },
  {
    id: 1,
    text: `Nếu bạn tin rằng bạn chỉ là thân tâm này, bạn sẽ chết!
      Nhưng khi bạn khám phá ra rằng bạn chính là Nhận Biết thì chuyện sinh tử chẳng bận lòng bạn nữa.`,
  },
  {
    id: 2,
    text: "Khi bên trong con có một cảm xúc tiêu cực nổ ra thì hãy thấu hiểu nó thay vì đánh nhau với nó. Tất cả các cảm xúc tiêu cực đều đến từ nỗi sợ một kết quả tiêu cực nào đó. Hãy cho cảm xúc đó xảy ra bất kể lý do gì, vì khi con cho nó xảy ra con mới thấy được bản chất của nó.",
  },
  {
    id: 3,
    text: "Chúng ta cần học cách nghỉ ngơi và thư giãn. Nó giúp ta phòng chống bệnh tật và giảm ngừa căng thẳng. Nó giúp ta có tâm trí sáng suốt để tập trung giải quyết các vấn đề.",
  },
  {
    id: 4,
    text: `Nhớ rằng tôi sẽ chết, đó là công cụ quan trọng nhất tôi từng có để giúp mình thực hiện những lựa chọn lớn trong cuộc đời. Bởi vì hầu hết tất cả mọi thứ - tất cả những hy vọng phù phiếm, lòng kiêu hãnh, nỗi sợ mất mặt hay thất bại - tất cả những thứ này sẽ mờ nhạt đi khi ta đối diện với cái chết, chỉ để lại điều gì thật sự quan trọng.
      Nhớ rằng bạn sẽ chết, đó là cách tốt nhất tôi biết để tránh cái bẫy suy nghĩ rằng bạn vẫn còn thứ để mất. Bạn thực chất chẳng có gì. Không có lí do để không đi theo trái tim.`,
  },
  {
    id: 5,
    text: "Khi bạn thật sự hiểu rằng bạn chỉ là một mảnh nhỏ của sự sống trong một vũ trụ bất tận, bạn sẽ tự nhiên cúi đầu trước mọi thứ.",
  },
  {
    id: 6,
    text: "Đừng lo cho ngày mai. Hãy để ngày mai mai lo. Hãy để lo lắng ngày nào đủ cho ngày ấy.",
  },
  {
    id: 7,
    text: "Nếu một việc gì đến mà ta không dũng cảm giải quyết cho tới nơi tới chốn, nó nhất định sẽ trở lại. Cuộc sống là vậy, nó sẽ lần lượt bắt mình thực hành mãi một bài học, cho đến khi thành thục mới thôi.",
  },
  {
    id: 8,
    text: "Chúng ta thường đánh giá thấp sức mạnh của nụ cười, của lời tử tế, của sự vỗ về, của tâm lắng nghe, của lời khen ngợi chân thành, hoặc một cử chỉ săn sóc rất nhỏ. Tất cả những điều ấy đều ẩn chứa khả năng thay đổi một cuộc đời.",
  },
  {
    id: 9,
    text: "Khôn ngoan chỉ đến qua con đường đau khổ. Có lẽ điều gì bắt trái tim ta tan nát chính là điều giúp trái tim rộng mở. Đau khổ giúp ta rất nhiều, nếu ta chấp nhận bài học mà đau khổ mang đến. Có lẽ chính thử thách lớn nhất trong đời sẽ ban tặng cơ hội lớn nhất.",
  },
  {
    id: 10,
    text: "Mỗi khi bạn phán xét ai đó là bạn tiết lộ một phần của bản thân cần được chữa lành.",
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
  // {
  //     id: 1,
  //     text: 'Nhận năng lượng vũ trụ'
  // },
  // {
  //     id: 2,
  //     text: 'Hấp thu thất tinh đại pháp'
  // },
  // {
  //     id: 3,
  //     text: 'Xin xăm đê'
  // },
  {
    id: 2,
    text: "Gét Gô",
  },
];
