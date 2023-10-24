import React, { useState, useEffect, useRef } from 'react';
import getPlayers from '../Utility/getPlayer';
const usePlayerlist=()=>{
    const [players, setPlayers] = useState([]);
    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          return age - 1;
        }
        return age;
      };
    const fetchData= async()=>{
        const data = await getPlayers()
        // const json=await data.json()
        
        const playersWithAge = data.map((player) => ({
            ...player,
            age: calculateAge(player.dob),
          }));
          
        setPlayers(playersWithAge)
      }
      useEffect(() => {
       fetchData()
      }, []);

      return players
}
export default usePlayerlist