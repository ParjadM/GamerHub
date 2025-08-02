import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import GameDetails from './GameDetails';

const GameList = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const apiKey = import.meta.env.VITE_RAWG_API_KEY;

  useEffect(() => {
    //fetch the url
    const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}&page_size=10`;
    //fetch the data
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setGames(data.results);
      });
  }, [apiKey]);
  //handle game click
  const handleGameClick = (game) => {
    setSelectedGame(game);
    setIsModalOpen(true);
  };
  //close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGame(null);
  };

  return (
    <>
      <div className="game-grid">
        <h2>Top Live Games - Click On The Game To See The Game Details</h2>
        <hr />
        {games.map((game, index) => (
          <div key={game.id} className="game-card" onClick={() => handleGameClick(game)}>
            <img src={game.background_image} alt={game.name} />
            <h3>#{index + 1} {game.name}</h3>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedGame && <GameDetails gameId={selectedGame.id} gameName={selectedGame.name} />}
      </Modal>
    </>
  );
};

export default GameList;
