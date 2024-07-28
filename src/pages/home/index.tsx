import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { fetchAllUserData, useFetchUserData } from "../../api/apiServices";
import averageBadge from "../../assets/images/averageBadge.svg";
import beginnerBadge from "../../assets/images/beginerBadge.svg";
import crockImg from "../../assets/images/corck_img.svg";
import court from "../../assets/images/court.svg";
import dummyImg from "../../assets/images/dummyImg.svg";
import proBadge from "../../assets/images/proBadge.svg";
import QuestionMark from "../../assets/images/questionMark.svg";
import streaks from "../../assets/images/streaksGrp.svg";
import Button from '../../components/buttonComponent';
import SubscriptionCard from '../../components/subscriptionCard';
import { db } from '../../firebaseconfig';
import { calculateDistance, getDateFormatISO, getDaysInMonth, getLastLoginTodayUser } from '../../helpers';
import { updateLocationMatch } from '../../redux/reducer/authSlice';
import { RootState } from '../../redux/store';
import "./styles.css";
import ScaningLoading from '../../components/scanLoading/scanLoading';
import { updateAllCourtDetails } from '../../redux/reducer/userSlice';
const Home: React.FC = () => {
  const userData = useSelector((state: RootState) => state.auth.user);
  const allUserDetails = useSelector((state: RootState) => state.user.allUserDetails);
  const courtDetails = useSelector((state: RootState) => state.user.courtDetails);
  const isLocationMatched = useSelector((state: RootState) => state.auth.match);
  const userId = userData?.userId
  const [location, setLocation] = useState<any>([]);
  const dispatch = useDispatch()

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
    }
  ]
  const data = [
    { name: 'week1', uv: 400, pv: 200 },
    { name: 'week2', uv: 300, pv: 400 },
    { name: 'week3', uv: 100, pv: 10 },
    { name: 'week4', uv: 300, pv: 200 },
    { name: 'week5', uv: 200, pv: 300 },
  ];

  const { loading, error } = useFetchUserData(userId);
  useEffect(() => {
    fetchAllUserData(dispatch)
  }, [userId])

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        // console.log(lat, lon);
        setLocation([lat, lon]);
        fetchLocations([lat, lon]);

      },
      (error) => { }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);






  const fetchLocations = async (coord: any) => {
    const hotelRef = collection(db, "BadmintonCourt");
    const unsubscribeHotel = onSnapshot(hotelRef, (snap) => {
      const data = snap.docs.map((x) => ({
        ...x.data(),
        // courtId: x.id,

      }));
      const distance = calculateDistance(
        coord[0],
        coord[1],
        data[0].coordinates[0],
        data[0].coordinates[1]
      );
      const isMatch = distance <= 50;
      dispatch(updateLocationMatch(isMatch))
      dispatch(updateAllCourtDetails(data))
    });
    return () => {
      unsubscribeHotel();
    };
  };
  const updateUserReady = async () => {
    if (!userId) {
      console.error("User ID not found in Redux store.");
      return;
    }
    const userDocRef = doc(db, "users", userId);
    let isUserReady
    if (userData?.readyMatch == true) {
      isUserReady = false
    } else {
      isUserReady = true
    }
    try {
      await updateDoc(userDocRef, {
        readyMatch: isUserReady,
      });
      console.log("User readiness updated in Firestore.");
    } catch (error) {
      console.error("Error updating user readiness:", error);
    }
  };

  useEffect(() => {
    allUserDetails?.filter((x: any) => getLastLoginTodayUser(x.lastLogin) == true)
  }, [allUserDetails])


  const updateCourt = async () => {
    const courtId = 'vX17ukZWStK6IRpWu6F5'; // Replace with the actual document ID

    // New data to update
    const updatedData = {

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
    }


    try {
      const docRef = doc(db, 'BadmintonCourt', courtId);

      // Update the document
      await updateDoc(docRef, updatedData);
      console.log('Document updated successfully');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };
  console.log(courtDetails)

  return (
    <div className='home-container'>
      <div className='p-4'>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <div className='d-flex flex-column'>
            <p className='akaya-style white-color mb-0 '>
              HELLO,
            </p>
            <p className='akaya-style white-color mb-0'>
              {userData?.name}
            </p>
          </div>
          {/* <Button
            label={userData.readyMatch ? "Exit Match" : "Ready "}
            height='30px'
            width='120px'
            secondaryBtn={true}
            primaryBtn={false}
            onClick={() => updateCourt()}
          /> */}
          <div className='position-relative'>
            <img src={streaks} alt='streaks' />
            <div className='streaks-label'>
              <p className='streaks-label-date ubuntu-regular  black-color mb-0'>{userData?.streaks}</p>
            </div>
          </div>
        </div>
        {!isLocationMatched && <div className='home-start-match-card mt-3'>
          <div className='w-25 d-flex flex-column '>
            <img src={crockImg} alt='img' width={100} height={100} />
          </div>
          <div className='w-50 d-flex flex-column h-100  align-items-center justify-content-evenly'>
            {userData.readyMatch ?
              <p className='start-match-card-label mb-0 primarygrey-color'>Now your in match </p> :
              <p className='start-match-card-label mb-0 primarygrey-color'>Now your not in match </p>
            }
            <Button
              label={userData.readyMatch ? "Exit Match" : "Ready "}
              height='30px'
              width='120px'
              secondaryBtn={true}
              primaryBtn={false}
              onClick={() => updateUserReady()}
            />
          </div>
        </div>}
        <p className='akaya-style white-color text-center  my-3'>
          Avaliable Players
        </p>
        <div className='avaliable-players-container scrollBar-hide'>
          {allUserDetails?.filter((x: any) => x.readyMatch == true).length > 0 ?
            allUserDetails?.filter((x: any) => x.readyMatch == true).map((playersData: any, index: number) => (
              <div className={
                playersData.level === "Pro" ? `avaliable-players-card-pro` :
                  playersData.level === "Average" ? `avaliable-players-card-average` : `avaliable-players-card-beginner`
              } key={index} >
                <div className='w-50 position-relative'>
                  <img src={playersData.level === "Pro" ? proBadge : playersData.level === "Average" ? averageBadge : beginnerBadge} alt="badge" />
                  <img src={playersData.profileimg || dummyImg} className='avaliable-profile-car-img' alt="img" />
                </div>
                <div className='w-50 d-flex flex-column align-items-start justify-content-around h-100'>
                  <p className='akaya-style fs-24 text-uppercase fs-bold black-color mb-2'>{playersData.name}</p>
                  <div className='d-flex w-100'>
                    <p className='w-50 akaya-style fs-18 mb-0' >{"Rank :"}</p>
                    <p className='w-50 akaya-style fs-18 mb-0' >{playersData.rank || "-"}</p>
                  </div>
                  <div className='d-flex w-100'>
                    <p className='w-50 akaya-style fs-18 mb-0' >{"Score :"}</p>
                    <p className='w-50 akaya-style fs-18 mb-0' >{playersData.score || "-"}</p>
                  </div>
                  <div className='d-flex w-100'>
                    <p className='w-50 akaya-style fs-18 mb-0' >{" Level :"}</p>
                    <p className='w-50 akaya-style fs-18 mb-0' >{playersData.level}</p>
                  </div>
                </div>
              </div>
            ))
            :
            <div className={
              `unavaliable-players-card`
            }  >
              <div className='w-100 ubuntu-bold text-center position-relative white-color'>
                Currenty No Player Avaliable
              </div>
            </div>
          }
        </div>
        <p className='akaya-style white-color text-center  my-3'>
          Current Match
        </p>
        <div className='current-match-container scrollBar-hide mb-5'>
          {courtDetails.map((match: any, index: any) => (
            <div className={"palyers-match-card"} key={index}
              style={{ backgroundImage: `url(${court})` }}>
              {Boolean(match.start) ? match.players.slice(0, 2).map((x: any, index: any) => (
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
              {/* <ScaningLoading /> */}
              {Boolean(match.start) ?
                match.players.slice(2, 4).map((x: any, index: any) => (
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
                    {userData?.phoneNumber == match.startBy == true ? <div className='d-flex justify-content-around w-100'  >
                      <Button
                        label="WON"
                        height='30px'
                        width='80px'
                        onClick={() => alert("sdf")}

                      />

                      <Button
                        label="WON"
                        height='30px'
                        width='80px'
                        onClick={() => alert("sdf")}

                      />
                    </div> : ""}
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
      </div>

      {
        !userData?.isAdmin ?
          <>
            <p className='akaya-style white-color text-center  my-3'>
              Your Performance
            </p>
            <ResponsiveContainer width="100%" height={400} className={"mb-5"}>
              <LineChart data={data}>
                <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                <XAxis dataKey="name" />
                <YAxis />
              </LineChart>
            </ResponsiveContainer>
            <SubscriptionCard />
          </> :
          <div className='top-login-list  scrollBar-hide pb-5 '>
            <p className='  fs-24 mb-3  black-color akaya-style text-center '>
              Today Login Players
            </p>
            {allUserDetails?.filter((x: any) => getLastLoginTodayUser(x.lastLogin) == true).length ?
              allUserDetails?.filter((x: any) => getLastLoginTodayUser(x.lastLogin) == true).map((players: any, index: number) => {
                const { formattedTime } = getDateFormatISO(players.lastLogin);
                return (
                  <div key={index}>
                    <div className='top-palyer-list-card'>
                      <img src={players.profileimg || dummyImg} className='top-palyer-list-profile-img' alt='rank3' />
                      <div className='d-flex justify-content-around align-items-center w-100 '>
                        <div className='w-auto  d-flex align-items-start flex-column'>
                          <p className=' mb-0 black-color akaya-style  ms-2'>
                            {players.name}
                          </p>
                          <p className=' mb-0 fs-18  ubuntu-medium E4-black-color  ms-2'>
                            {players.slot}
                          </p>
                        </div>
                        <div className='w-auto  d-flex align-items-start flex-column'>
                          <p className=' mb-2  E4-black-color ubuntu-medium px-2'>
                            {formattedTime}
                          </p>
                          <p className=' mb-0  E4-black-color ubuntu-medium ms-2'>
                            {players.todayMatchPlayed} Match
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }) :
              <p className='  fs-20 mb-3  black-color akaya-style text-center '>
                No One Login Today
              </p>

            }

          </div>
      }
    </div >
  );
};

export default Home;

