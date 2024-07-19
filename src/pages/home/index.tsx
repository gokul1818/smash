import React from 'react';
import crockImg from "../../assets/images/corck_img.svg";
import proBadge from "../../assets/images/proBadge.svg";
import averageBadge from "../../assets/images/averageBadge.svg";
import beginnerBadge from "../../assets/images/beginerBadge.svg";
import court from "../../assets/images/court.svg";
import QuestionMark from "../../assets/images/questionMark.svg";
import streaks from "../../assets/images/streaksGrp.svg";
import "./styles.css";
import dummyImg from "../../assets/images/dummyImg.svg";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Button from '../../components/buttonComponent';

const Home: React.FC = () => {

  const avaliablePlayerData = [
    {
      name: "rocky boy",
      profileimg: dummyImg,
      level: "pro",
      rank: 2,
      score: 100
    },
    {
      name: "rocky boy",
      profileimg: dummyImg,
      level: "average",
      rank: 2,
      score: 100
    },
    {
      name: "rocky boy",
      profileimg: dummyImg,
      level: "beginner",
      rank: 2,
      score: 100
    },
    {
      name: "rocky boy",
      profileimg: dummyImg,
      level: "pro",
      rank: 2,
      score: 100
    },
    {
      name: "rocky boy",
      profileimg: dummyImg,
      level: "average",
      rank: 2,
      score: 100
    }
  ]
  const currentMatch = [
    {
      court: 1,
      players: [

      ],
      start: false,
      Awinner: false,
      Bwinner: true

    },

    {
      court: 1,
      players: [
        {
          name: "rocky boy",
          profileimg: dummyImg,
          level: "average",
          rank: 2,
          score: 100
        },
        {
          name: "rocky boy",
          profileimg: dummyImg,
          level: "average",
          rank: 2,
          score: 100
        },
        {
          name: "rocky boy",
          profileimg: dummyImg,
          level: "average",
          rank: 2,
          score: 100
        },
        {
          name: "rocky boy",
          profileimg: dummyImg,
          level: "beginner",
          rank: 2,
          score: 100
        }
      ],
      start: true,
      Awinner: true,
      Bwinner: false
    },


  ]
  const data = [
    { name: 'week1', uv: 400, pv: 200 },
    { name: 'week2', uv: 300, pv: 400 },
    { name: 'week3', uv: 100, pv: 10 },
    { name: 'week4', uv: 300, pv: 200 },
    { name: 'week5', uv: 200, pv: 300 },
  ];

  return (
    <div className='home-container p-4'>
      <div className="d-flex flex-row justify-content-between align-items-center">
        <div className='d-flex flex-column'>
          <p className='akaya-style white-color mb-0 '>
            HELLO,
          </p>
          <p className='akaya-style white-color mb-0'>
            ROCKY BOY
          </p>
        </div>
        <div className='position-relative'>
          <img src={streaks} alt='streaks' />
          <div className='streaks-label'>
            <p className='streaks-label-date black-color mb-0'>01</p>
          </div>
        </div>
      </div>
      <div className='home-start-match-card mt-3'>
        <div className='w-25 d-flex flex-column '>
          <img src={crockImg} alt='img' width={100} height={100} />
        </div>
        <div className='w-50 d-flex flex-column h-100  align-items-center justify-content-evenly'>
          <p className='start-match-card-label mb-0 primarygrey-color'>Now your not in match </p>
          <Button
            label="Start Match"
            height='30px'
            width='120px'
            secondaryBtn={true}
            primaryBtn={false}
          />
        </div>
      </div>
      <p className='akaya-style white-color text-center  my-3'>
        Avaliable Players
      </p>
      <div className='avaliable-players-container'>

        {avaliablePlayerData.map((playersData, index) => (
          <div className={playersData.level === "pro" ? `avaliable-players-card-pro` :
            playersData.level === "average" ? `avaliable-players-card-average` : `avaliable-players-card-beginner`
          } key={index}>
            <div className='w-50 position-relative'>
              <img src={playersData.level === "pro" ? proBadge : playersData.level === "average" ? averageBadge : beginnerBadge} alt="badge" />
              <img src={playersData.profileimg} className='avaliable-profile-car-img' />
            </div>
            <div className='w-50 d-flex flex-column align-items-start justify-content-around h-100'>
              <p className='akaya-style fs-24 text-uppercase fs-bold black-color mb-2'>{playersData.name}</p>
              <div className='d-flex w-100'>
                <p className='w-50 akaya-style fs-18 mb-0' >{"Rank :"}</p>
                <p className='w-50 akaya-style fs-18 mb-0' >{playersData.rank}</p>
              </div>
              <div className='d-flex w-100'>
                <p className='w-50 akaya-style fs-18 mb-0' >{"Score :"}</p>
                <p className='w-50 akaya-style fs-18 mb-0' >{playersData.score}</p>
              </div>
              <div className='d-flex w-100'>
                <p className='w-50 akaya-style fs-18 mb-0' >{" Level :"}</p>
                <p className='w-50 akaya-style fs-18 mb-0' >{playersData.level}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className='akaya-style white-color text-center  my-3'>
        Current Match
      </p>
      <div className='current-match-container mb-5'>
        {currentMatch.map((match, index) => (
          <div className={"palyers-match-card"} key={index}
            style={{ backgroundImage: `url(${court})` }}>

            {Boolean(match.start) ? match.players.slice(0, 2).map((x, index) => (
              <div className='player-profile-img' style={{ top: index === 0 ? "29px" : "94px" }} key={index}>
                <img src={x.profileimg} className='profile-img' alt='img' />
              </div>
            )) :
              Array.of(1, 2).map((x, index) => (
                <div className='player-profile-img' style={{ top: index === 0 ? "29px" : "94px" }} key={index}>
                  <img src={QuestionMark} className='profile-img' alt='img' />
                </div>
              ))
            }
            {Boolean(match.start) ?
              match.players.slice(2, 4).map((x, index) => (
                <div className='player-profile-img1' key={index} style={{ top: index === 0 ? "29px" : "94px" }}>
                  <img src={x.profileimg} className='profile-img' alt="img" />
                </div>
              )) :
              Array.of(3, 4).map((x, index) => (
                <div className='player-profile-img1' style={{ top: index === 0 ? "29px" : "94px" }} key={index}>
                  <img src={QuestionMark} className='profile-img' alt='img' />
                </div>
              ))}

            <div className='palyers-match-btn-container'>
              {match.start ?
                <div className='d-flex flex-column justify-content-center align-items-center  w-100'>
                  <div className='d-flex justify-content-around w-100'  >
                    <Button
                      label="WON"
                      height='30px'
                      width='80px'
                    />

                    <Button
                      label="WON"
                      height='30px'
                      width='80px'
                    />
                  </div>


                </div>
                :
                <Button
                  label="Start Match"
                  height='30px'
                  width='120px'
                />

              }
            </div>

          </div>
        ))}
      </div>
      <p className='akaya-style white-color text-center  my-3'>
        Your Performance
      </p>
      <ResponsiveContainer width="100%" height={400} className={"mb-5"}>
        <LineChart data={data}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <Line type="monotone" dataKey="pv" stroke="#294935" name="Page Views" />
          <XAxis dataKey="name" />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
    </div >
  );
};

export default Home;
