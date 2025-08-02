import React, { useState, useEffect } from 'react';

const GameList = () => {
  const [games, setGames] = useState([]);

  const apiKey = import.meta.env.VITE_RAWG_API_KEY;

  useEffect(() => {
    //gets the 12 games
    const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}&page_size=12`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      setGames(data.results);
    });
  }, [apiKey]);


  return (
    <div className="game-grid">
      <h2>Top Live Games</h2>
      {games.map((game) => (
        <div key={game.id} className="game-card">
          <img src={game.background_image} alt={game.name} />
          <h3>{game.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default GameList;