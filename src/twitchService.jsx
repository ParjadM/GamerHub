const CLIENT_ID = import.meta.env.VITE_TWITCH_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_TWITCH_CLIENT_SECRET;

//uses fetch to get access token
const getAccessToken = async () => {
  const url = `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`;

  const response = await fetch(url, {
    method: 'POST',
  });
  const data = await response.json();
  //return the access token
  return data.access_token;
};

//Get a stream for a specific game
export const getStreamForGame = async (gameName) => {
  //save the access token
  const accessToken = await getAccessToken();
  
  const gameUrl = `https://api.twitch.tv/helix/games?name=${encodeURIComponent(gameName)}`;

  const gameResponse = await fetch(gameUrl, {
    headers: {
      'Client-ID': CLIENT_ID,
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  //get the game data
  const gameData = await gameResponse.json();
  //if no game data return null
  if (!gameData.data || gameData.data.length === 0) {
    return null;
  }

  const gameId = gameData.data[0].id;

  //get the stream for the game
  const streamUrl = `https://api.twitch.tv/helix/streams?game_id=${gameId}&first=1`;

  const streamResponse = await fetch(streamUrl, {
    headers: {
      'Client-ID': CLIENT_ID,
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  const streamData = await streamResponse.json();
  //return the stream data
  return streamData.data ?  streamData.data[0] : null;
};