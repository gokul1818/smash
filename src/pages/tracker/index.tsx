import React, { useEffect, useState } from 'react';
import "./styles.css"
import dummyImg from "../../assets/images/dummyImg.svg";
import Podium from "../../assets/images/Podium.svg";

import Button from '../../components/buttonComponent';
const Tracker: React.FC = () => {
  const [isFirstHalfVisible, setIsFirstHalfVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {

      // Check if Podium needs to be fixed
      if (window.scrollY > 100) {
        setIsFirstHalfVisible(true);
      } else {
        setIsFirstHalfVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const topPlayerList = [
    {
      playerName: "RockyBoy",
      rank: 2,
      score: 3,
      profileimg: dummyImg
    },
    {
      playerName: "RockyBoy",
      rank: 2,
      score: 3,
      profileimg: dummyImg
    },
    {
      playerName: "RockyBoy",
      rank: 2,
      score: 3,
      profileimg: dummyImg
    },
    {
      playerName: "RockyBoy",
      rank: 2,
      score: 3,
      profileimg: dummyImg
    },
    {
      playerName: "RockyBoy",
      rank: 2,
      score: 3,
      profileimg: dummyImg
    },
    {
      playerName: "RockyBoy",
      rank: 2,
      score: 3,
      profileimg: dummyImg
    },

    {
      playerName: "RockyBoy",
      rank: 2,
      score: 3,
      profileimg: dummyImg
    },
    {
      playerName: "RockyBoy",
      rank: 2,
      score: 3,
      profileimg: dummyImg
    },
    {
      playerName: "RockyBoy",
      rank: 2,
      score: 3,
      profileimg: dummyImg
    },
    {
      playerName: "RockyBoy",
      rank: 2,
      score: 3,
      profileimg: dummyImg
    },
    {
      playerName: "RockyBoy",
      rank: 2,
      score: 3,
      profileimg: dummyImg
    },
  ]

  return (
    <div className='leaderboard-container p-4'>
      <div className={`first-half ${isFirstHalfVisible ? 'fade-in' : ''}`}>
        <div className="d-flex flex-row justify-content-around align-items-center">
          <Button
            label="Weekly"
            height='30px'
            width='120px'
            secondaryBtn={true}
            primaryBtn={false}
          />
          <Button
            label="All Time"
            height='30px'
            width='120px'
            primaryBtn={true}
          />
        </div>
        <div className='d-flex flex-row justify-content-center  align-items-center mt-5'>
          <div className={`podium-container`}>
            <img src={Podium} alt='podium' className='position-relative' />
            <img src={dummyImg} className='rank1-profile-img' alt='rank1' />
            <img src={dummyImg} className='rank2-profile-img' alt='rank2' />
            <img src={dummyImg} className='rank3-profile-img' alt='rank3' />
          </div>
        </div>

      </div>
      <div className='top-player-list pb-5'>
        <p className='  fs-20 mb-3  black-color akaya-style fs-24 text-center '>
          Top Players List
        </p>
        {topPlayerList.map((players, index) => (
          <div key={index}>
            <div className='top-palyer-list-card'>
              <div className='w-50  d-flex align-items-center'>
                <img src={players.profileimg} className='top-palyer-list-profile-img' alt='rank3' />
                <p className='  fs-20 mb-0  E4-black-color audiowide-regular ms-2'>
                  #{players.rank}
                </p>
              </div>
              <div className='d-flex flex-column w-50 align-items-start'>
                <p className='ubuntu-medium mb-0 '>
                  {players.playerName}
                </p>
                <p className='E1-black-color ubuntu-regular  mb-0 '>
                  Score:{players.score}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tracker;
