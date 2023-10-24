import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import usePlayerlist from '../Common/usePlayerlist';
function AboutCricketer() {
  const { id } = useParams();
  const players=usePlayerlist()
  const cricketer = players.find((player) => player.id === id);
  const similarPlayers = players.filter((player) => player.type === cricketer.type && player.id !== cricketer.id).slice(0, 5); 

  if (!cricketer) {
    return <div>Cricketer not found</div>;
  }

  return (
    <div className="about-cricketer-container">
      <Link to="/" className="back-link">Back to Cricketers</Link>
      <h2>About {cricketer.name}</h2>
      <p>{cricketer.description}</p>
      <p>
        <strong>Type:</strong> {cricketer.type}
      </p>
      <p>
        <strong>Rank:</strong> {cricketer.rank}
      </p>
      <p>
        <strong>Points:</strong> {cricketer.points}
      </p>
      <p>
        <strong>Date of Birth:</strong> {new Date(cricketer.dob).toLocaleDateString()}
      </p>
      <p>
        <strong>Age:</strong> {calculateAge(cricketer.dob)}
      </p>
      

      {similarPlayers.length > 0 && (
        <div className="similar-players">
          <h3>Similar Players</h3>
          <ul>
            {similarPlayers.map((similarPlayer) => (
              <li key={similarPlayer.id}>
                <strong>Name:</strong> {similarPlayer.name} <br />
                <strong>Points:</strong> {similarPlayer.points} <br />
                <strong>Rank:</strong> {similarPlayer.rank}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Function to calculate age based on the date of birth
function calculateAge(dob) {
  const birthDate = new Date(dob);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  if (currentDate.getMonth() < birthDate.getMonth() || (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
    return age - 1;
  }
  return age;
}

export default AboutCricketer;
