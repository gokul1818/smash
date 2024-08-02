import React, { useEffect, useState } from 'react';
import dummyImg from "../../assets/images/dummyImg.svg";
import Podium from "../../assets/images/Podium.svg";
import "./styles.css";

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchAllUserData } from '../../api/apiServices';
interface User {
  rank: number;
  [key: string]: any; // Allows additional properties
}

const sortByRank = (usersData: User[], ascending = true): User[] => {
  return [...usersData].sort((a, b) => {
    if (ascending) {
      return a.score - b.score; // Ascending order
    } else {
      return b.score - a.score; // Descending order
    }
  });
};

const Tracker: React.FC = () => {
  const allUserDetails = useSelector((state: RootState) => state.user.allUserDetails);
  const dispatch = useDispatch()
  const userData = useSelector((state: RootState) => state.auth.user);
  const userId = userData?.userId
  const [sortedUserDetails, setSortedUserDetails] = useState<User[]>([]); const [isFirstHalfVisible, setIsFirstHalfVisible] = useState(false);
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


  useEffect(() => {
    fetchAllUserData(dispatch);
  }, [userId, dispatch]);

  // Sort user details whenever allUserDetails changes
  useEffect(() => {
    if (allUserDetails.length) {
      const sorted = sortByRank(allUserDetails, false);
      setSortedUserDetails(sorted);
    }
  }, [allUserDetails]);

  console.log(sortedUserDetails)
  return (
    <div className='leaderboard-container p-4'>
      <div className={`first-half ${isFirstHalfVisible ? 'fade-in' : ''}`}>
        <div className="d-flex flex-row justify-content-around align-items-center">
          <p className='  fs-20 mb-3  white-color akaya-style fs-24 text-center '>
            LeaderBoard
          </p>
        </div>
        <div className='d-flex flex-row justify-content-center  align-items-center mt-5'>
          <div className={`podium-container`}>
            <img src={Podium} alt='podium' className='position-relative' />
            <div className='rank1-profile-img'>
              <img src={sortedUserDetails[0]?.profilePic} className='rank-profile-img' alt='rank1' />
              <p className='  mb-3  white-color ubuntu-regular fs-18 text-center '>
                {sortedUserDetails[0]?.name}
              </p>
            </div>
            <div className='rank2-profile-img'>
              <img src={sortedUserDetails[1]?.profilePic} className='rank-profile-img' alt='rank2' />
              <p className='  mb-3  white-color ubuntu-regular fs-18 text-center '>
                {sortedUserDetails[1]?.name}
              </p>
            </div>
            <div className='rank3-profile-img'>
              <img src={sortedUserDetails[2]?.profilePic} className='rank-profile-img' alt='rank3' />
              <p className=' mb-3  white-color ubuntu-regular fs-18 text-center '>
                {sortedUserDetails[2]?.name}
              </p>
            </div>
          </div>
        </div>

      </div>
      <div className='top-player-list pb-5'>
        <p className='  fs-20 mb-3  black-color akaya-style fs-24 text-center '>
          Top Players List
        </p>
        {sortedUserDetails.map((players: any, index: any) => (
          <div key={index}>
            <div className={`top-palyer-list-card  ${index == 0 ? "rank1card" : index == 1 ? "rank2card" : index == 2 ? "rank3card" : ""}`}>
              <div className='w-50  d-flex align-items-center'>
                <img src={players.profilePic} className='top-palyer-list-profile-img' alt='rank3' />
                <p className='fs-20 mb-0  E4-black-color audiowide-regular ms-2'>
                  #{index + 1}
                </p>
              </div>
              <div className='d-flex flex-column w-50 align-items-start'>
                <p className='ubuntu-bold mb-0 '>
                  {players.name}
                </p>
                <p className='E1-black-color ubuntu-regular  mb-0 '>
                  Score:{players.score}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div >
  );
};

export default Tracker;
