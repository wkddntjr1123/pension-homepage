import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppContext } from "../../libs/Context";

const Subnav = ({ data }) => {
  return (
    <>
      <ul className="sub-box">
        {data.map((item, index) => (
          <li key={index}>
            <Link href={item.link}>
              <a>{item.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .sub-box {
          position: absolute;
          max-height: 0;
          overflow: hidden;
          width: 11rem;
          transform: translateX(-50%);
          left: 50%;
          transition: max-height ease 0.4s;
          background-color: rgba(34, 34, 34, 0.7);
          top: 4rem;
        }
        .sub-box li {
          border-bottom: 1px solid #555555;
        }
        .sub-box a {
          display: block;
          transition: color ease 0.3s;
          font-size: 0.8rem;
          text-align: center;
          line-height: 2.5rem;
          color: #c2c2c2;
        }
        .sub-box li:last-child {
          border: 0;
        }
        .sub-box a:hover {
          color: white;
        }
        @media screen and (max-width: 820px) {
          .sub-box {
            position: static;
            width: 100%;
            line-height: 2rem;
            text-align: start;
            transform: none;
            background-color: transparent;
            transition: max-height ease 0.2s;
          }
          .sub-box li {
            text-align: start;
            border-bottom: none;
          }
          .sub-box li:last-child {
            margin-bottom: 0.8rem;
          }

          .sub-box a {
            color: rgb(134, 134, 134);
            border-bottom: none;
            text-align: start;
            line-height: 2.2rem;
            font-size: 0.9rem;
          }
          .sub-box a::before {
            content: "-";
            margin-left: 5%;
          }
        }
      `}</style>
    </>
  );
};

export default function Nav({ isOpen }) {
  const { isMobile } = useAppContext();
  const [isSubOpen, setIsSubOpen] = useState([false, false, false, false, false]);

  //????????? : isOpen??? false??? ?????? subBox?????? ??????
  useEffect(() => {
    if (!isOpen) {
      setIsSubOpen([false, false, false, false, false]);
    }
  }, [isOpen]);

  const menu = [
    { title: "????????????", link: "/about" },
    { title: "????????????", link: "/room" },
    { title: "??????&?????????", link: "/facility-service" },
    { title: "??????", link: "/reservation" },
    { title: "????????????", link: "/community" },
  ];

  const subData = {
    menu1: [
      { title: "????????????", link: "/about" },
      { title: "????????????", link: "/about/#location" },
    ],
    menu2: [
      { title: "????????????", link: "/room" },
      { title: "A101???(??????)", link: "/room/101" },
      { title: "A102???(??????)", link: "#" },
      { title: "A103???(??????)", link: "#" },
      { title: "B201???(??????)", link: "#" },
      { title: "B202???(??????)", link: "#" },
      { title: "B203???(??????)", link: "#" },
    ],
    menu3: [
      { title: "????????????", link: "/facility-service" },
      { title: "??????????????????", link: "/facility-service/barbecue" },
      { title: "?????????", link: "#" },
      { title: "?????????&???&??????", link: "#" },
      { title: "??????", link: "#" },
    ],
    menu4: [
      { title: "????????????", link: "/reservation" },
      { title: "???????????????", link: "/reservation/book" },
    ],
    menu5: [
      { title: "????????????", link: "#" },
      { title: "?????????", link: "#" },
    ],
  };

  const handleDisplay = (event, index) => {
    if (!isMobile) {
      const selected = document.getElementsByClassName("sub-box")[index];
      if (event.type === "mouseover") {
        selected.style.maxHeight = "15rem";
      } else {
        selected.style.maxHeight = "0";
      }
    }
  };
  const handelSubDisplay = (index) => {
    const tempSub = [...isSubOpen];
    //1.????????? true????????? ??????
    const trueIdx = tempSub.indexOf(true);
    //2-1.????????? ?????? ????????? ?????? ?????? tempSub[index]
    if (trueIdx === -1) {
      tempSub[index] = true;
      setIsSubOpen(tempSub);
      //2.2 ?????????
    } else {
      //2-2-1.????????? ?????? ?????? ???????????? ??????
      if (index === trueIdx) {
        tempSub[index] = false;
        setIsSubOpen(tempSub);
      } //2-2-2. ????????? ?????? ???????????? ????????? ?????? ????????? ??? ??????
      else {
        tempSub[trueIdx] = false;
        tempSub[index] = true;
        setIsSubOpen(tempSub);
      }
    }
  };
  //3. isSubOpen??? state????????? ?????? sub????????? ????????????
  useEffect(() => {
    if (!isMobile) {
      return false;
    }
    const subBoxes = document.getElementsByClassName("sub-box");
    const icons = document.getElementsByClassName("mb-sub-icon");

    for (let i = 0; i < isSubOpen.length; i++) {
      let box_max_height =
        Array.prototype.reduce.call(
          subBoxes[i].childNodes,
          function (p, c) {
            return p + (c.offsetHeight || 0);
          },
          0,
        ) +
        13 +
        "px";

      if (isSubOpen[i]) {
        subBoxes[i].style.maxHeight = box_max_height;
        icons[i].textContent = "-";
      } else {
        subBoxes[i].style.maxHeight = "0";
        icons[i].textContent = "+";
      }
    }
  }, [isSubOpen]);
  return (
    <>
      <div>
        <ul id="menus">
          {menu.map((item, index) => (
            <li key={index} className="nav-item" onMouseOver={(event) => handleDisplay(event, index)} onMouseOut={(event) => handleDisplay(event, index)}>
              {isMobile ? (
                <>
                  <div onClick={() => handelSubDisplay(index)}>
                    {item.title} <span className="mb-sub-icon">+</span>
                  </div>
                  <Subnav data={subData[`menu${index + 1}`]} />
                </>
              ) : (
                <>
                  <Link href={item.link}>
                    <a>{item.title}</a>
                  </Link>

                  <Subnav data={subData[`menu${index + 1}`]} />
                </>
              )}
            </li>
          ))}
          {!isMobile && (
            <li className="nav-item band">
              <a href="https://band.us/n/a4ad53e274s4K" target="_blank">
                <Image src="/icons/band.png" width={30} height={30}></Image>
              </a>
            </li>
          )}
        </ul>
      </div>
      <style jsx>
        {`
          ul {
            display: flex;
            height: 100%;
            align-items: center;
          }
          .nav-item {
            display: inline-block;
            font-size: 1.1rem;
            position: relative;
            height: 100%;
            display: flex;
            align-items: center;
          }
          .nav-item a {
            display: inline-block;
            width: 100%;
            position: relative;
            color: inherit;
            padding: 1.5rem;
            text-shadow: 1px 1px 2px rgb(0 0 0 / 50%);
            transition: color ease 0.3s;
          }
          .nav-item a:hover {
            color: #ffaaaa;
          }

          @media screen and (max-width: 820px) {
            ul {
              width: 100%;
              background: #fbfbfb;
              height: 0;
              overflow: hidden;
              display: block;
              transition: height 0.2s ease;
              box-shadow: 1px 1px black;
              border-collapse: collapse;
            }
            .nav-item {
              display: block;
              position: relative;
              font-size: 1.1rem;
              font-weight: 400;
              letter-spacing: 0.3rem;
              height: auto;
              width: 85%;
              margin: auto;
              border-bottom: 1px solid #e5e5e5;
            }
            .nav-item:last-child {
              border-bottom: none !important;
            }

            .mb-sub-icon {
              display: block;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              right: -5px;
              color: #909090;
              font-size: 1rem;
            }

            .nav-item div {
              color: inherit;
              padding: 0.7rem;
              text-shadow: none;
              position: relative;
            }
          }
        `}
      </style>
    </>
  );
}
