import React, { useState, useEffect } from 'react';
import { getTopStreams } from '../twitchService.jsx';

const TopStreams = () => {
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    const fetchStreams = async () => {
      const data = await getTopStreams();
      setStreams(data);
    };

    fetchStreams();
  }, []);

  // This helper function formats the thumbnail URL from Twitch
  const getImageUrl = (url) => {
    return url.replace('{width}', '440').replace('{height}', '248');
  };

  return (
    <div className="streams-section">
      <h2>Top Live Streams on Twitch</h2>
      <div className="game-grid"> 
        {streams.map((stream) => (
          <div key={stream.id} className="game-card">
            <img src={getImageUrl(stream.thumbnail_url)} alt={stream.title} />
            <div className="stream-info">
              <h3>{stream.game_name}</h3>
              <p>{stream.user_name}</p>
              <p>{stream.viewer_count.toLocaleString()} viewers</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopStreams;