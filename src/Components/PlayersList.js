import React, { useState, useEffect, useRef } from 'react';
import { useFilterSearch } from '../Utility/FilterSearchContext';
import { Link } from "react-router-dom";
import usePlayerlist from '../Common/usePlayerlist';


const CricketerList = () => {
  const [players, setPlayers] = useState([]);

  const allPlayers=useRef([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [playersPerPage] = useState(10);
  const [sortKey, setSortKey] = useState('name');
//   const [filterType, setFilterType] = useState('');
//   const [searchName, setSearchName] = useState('');

const { filterType, setFilterType, searchName, setSearchName } = useFilterSearch();
const playersWithAge=usePlayerlist()
  
  useEffect(() => {
 
        allPlayers.current=playersWithAge
         setPlayers(playersWithAge)
   
    
   
  }, [playersWithAge]);
 
  
  

  // Calculate age for each player
 

  // Pagination
  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers =players.slice(indexOfFirstPlayer, indexOfLastPlayer);

  // Sort players
  
  const sortedPlayers = [...currentPlayers].sort((a, b) => {
    if (sortKey === 'rank') {
      return a.rank - b.rank;
    } else if (sortKey === 'age') {
      return a.age - b.age;
    }
    return a.name.localeCompare(b.name);
  });
  console.log(allPlayers.current,players,currentPlayers,sortedPlayers,"sorted players")

  // Handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle filter and search
  const filterAndSearchPlayers = () => {
    console.log(filterType)
   // console.log(allPlayers.current)
    const filteredPlayers = allPlayers.current.filter((player) =>
      (!filterType || player.type === filterType) &&
      (!searchName || player.name.toLowerCase().includes(searchName.toLowerCase()))
    );
    console.log(filteredPlayers,"filter players")
    setPlayers(filteredPlayers);
    
    
    setCurrentPage(1);
  };

  useEffect(() => {
    //console.log("Filter chnaged")
    filterAndSearchPlayers();
  }, [filterType, searchName,playersWithAge]);

  

  return (
    <div className="cricketer-list-container">
      <h1>Cricketer List</h1>

      <div className="filter-section">
  <label>Filter by Type:</label>
  <select
    value={filterType}
    onChange={(e) => {
       
        setFilterType(e.target.value)}
    }
    className={filterType ? 'selected' : ''}
  >
    <option value="">All</option>
    <option value="batsman">Batsman</option>
    <option value="bowler">Bowler</option>
    <option value="allRounder">All-Rounder</option>
    <option value="wicketKeeper">Wicket Keeper</option>
  </select>
</div>

      <div className="search-section">
        <label>Search by Name:</label>
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>

      <table className="cricketer-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Points</th>
            <th className={sortKey === 'rank' ? 'selected' : ''} onClick={() => setSortKey('rank')}>Rank</th>
            <th className={sortKey === 'age' ? 'selected' : ''} onClick={() => setSortKey('age')}>Age</th>
          </tr>
        </thead>
        <tbody>
          {sortedPlayers.map((player) => (
            <tr key={player.id}>
             <Link to={`/cricketer-details/${player.id}`}><td>{player.name}</td></Link> 
              <td>{player.type}</td>
              <td>{player.points}</td>
              <td>{player.rank}</td>
              <td>{player.age}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(players.length / playersPerPage) }, (_, i) => (
          <button
          key={i}
          onClick={() => paginate(i + 1)}
          className={currentPage === i + 1 ? 'selected' : ''}
        >
          {i + 1}
        </button>
        ))}
      </div>
    </div>
  );
};

export default CricketerList;
