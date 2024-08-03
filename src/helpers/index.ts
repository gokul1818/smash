import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";

export const utf8ToBase64 = (str: any) => {
  return btoa(unescape(encodeURIComponent(str)));
};
export const base64ToUtf8 = (base64Str: any) => {
  return decodeURIComponent(escape(atob(base64Str)));
};

export const getDateFormatISO = (isoDateString: any) => {
  const date = new Date(isoDateString);

  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedDateOnly = date.toLocaleDateString('en-US', {
    // year: 'numeric',

    // month: 'long',
    day: 'numeric'
  });
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    // second: '2-digit'
  });
  return { formattedDate, formattedTime, formattedDateOnly }
}

export const getLastLoginTodayUser = (lastLogin: any) => {
  const currentDate = new Date();
  const lastLoginDate = new Date(lastLogin);
  // Compare only the date part (year, month, day)
  const isLastLoginToday = lastLoginDate.getFullYear() === currentDate.getFullYear() &&
    lastLoginDate.getMonth() === currentDate.getMonth() &&
    lastLoginDate.getDate() === currentDate.getDate();
  return isLastLoginToday

}

export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371e3; // Radius of the Earth in meters
  const φ1 = (lat1 * Math.PI) / 180; // Convert latitude 1 to radians
  const φ2 = (lat2 * Math.PI) / 180; // Convert latitude 2 to radians
  const Δφ = ((lat2 - lat1) * Math.PI) / 180; // Difference in latitude
  const Δλ = ((lon2 - lon1) * Math.PI) / 180; // Difference in longitude

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance;
};

export const getDaysInNextMonth = (): number => {
  const date = new Date();
  const nextMonthDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const lastDayOfNextMonth = new Date(
    nextMonthDate.getFullYear(),
    nextMonthDate.getMonth() + 1,
    0
  );
  return lastDayOfNextMonth.getDate();
};

export const getDaysInMonth = (isoDateString: string): number => {
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDayNextMonth = new Date(year, month + 1, 1);
  const lastDayCurrentMonth = new Date(firstDayNextMonth.getTime() - 1);
  return lastDayCurrentMonth.getDate();
};

export const getChoosePlayer = (allUserDetails: any) => {
  // Set initial loading state
  let loading = true;

  // Function to shuffle an array
  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  };

  // Filter players who are ready for a match
  const availablePlayers = allUserDetails.filter((x: any) => x.readyMatch === true);

  // Sort players based on the number of matches played
  const sortedPlayers = [...availablePlayers].sort((a: any, b: any) => a?.todayMatchPlayed - b?.todayMatchPlayed);

  // Shuffle sorted players and take the first 4
  const shuffledPlayers = shuffleArray(sortedPlayers).slice(0, 4);

  // Update the loading state and return the result
  // loading = false;


  if (shuffledPlayers.length >= 4) {
    return { loading, players: shuffledPlayers };
  } else {
    console.log('Not enough players available.');

    return { loading, players: [], err: "Not enough players available to start match" };
  }
};


export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function (...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  };
}

export const handleMatchReset = async () => {
  console.log("sdfsdf")
  const courtId = 'vX17ukZWStK6IRpWu6F5'; // Replace with the actual document ID
  const courtRef = doc(db, "BadmintonCourt", courtId);
  const updatedData = {
    court: 1,
    players: [],
    start: false,
    startBy: "",
    startTime: ""
  }
  await updateDoc(courtRef, updatedData);
}



export const formatTime = (ms: any) => {
  const minutes = Math.floor(ms / (60 * 1000));
  const seconds = Math.floor((ms % (60 * 1000)) / 1000);
  setTimeout(() => {

    if (minutes == 0 && seconds == 0) {
      console.log(minutes, seconds)
      // handleMatchReset()
    }
  }, 3000);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const checkLocationServices = (callback: (enabled: boolean) => void) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      () => callback(true),  // Location enabled
      () => callback(false)  // Location disabled or unavailable
    );
  } else {
    callback(false); // Geolocation not supported
  }
};

