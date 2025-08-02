import React, { useState, useEffect } from 'react';
import { getStreamForGame } from '../twitchService.jsx';

//game details using gameID and game name
const GameDetails = ({ gameId, gameName }) => {
  const [details, setDetails] = useState(null);
  const [stream, setStream] = useState(null);

  const apiKey = import.meta.env.VITE_RAWG_API_KEY;

  useEffect(() => {
    if (!gameId) return;
    //fetch the url
    const apiUrl = `https://api.rawg.io/api/games/${gameId}?key=${apiKey}`;
    //fetch the data
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setDetails(data);
      });
  }, [gameId, apiKey]);
  //fetch the stream
  useEffect(() => {
    if (!gameName) return;

    const fetchStream = async () => {
      const streamData = await getStreamForGame(gameName);
      setStream(streamData);
    };

    fetchStream();
  }, [gameName]);
  //if no details return null
  if (!details) {
    return null; 
  }
  //display the details
  return (
    <div className="game-details">
      <h2>{details.name}</h2>
      <img src={details.background_image} alt={details.name} />
      <div dangerouslySetInnerHTML={{ __html: details.description }} />
      <hr />
      <h3>Live Stream on Twitch</h3>
      {stream ? (
        <div>
          <h4>{stream.title}</h4>
          {/* the frame for live twitch stream */}
          <iframe
            src={`https://player.twitch.tv/?channel=${stream.user_name}&parent=${window.location.hostname}&muted=true`}
            height="480"
            width="100%"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <p>There are no live stream for this game!</p>
      )}
    </div>
  );
};

export default GameDetails;
