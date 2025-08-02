//this file is made for twitch services
//it includes both client_id and client_secret unlike gamelist which only contains api
const CLIENT_ID = import.meta.env.VITE_TWITCH_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_TWITCH_CLIENT_SECRET;

//uses eftch to get access token
const getAccessToken = async () => {
  const url = `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`;

  const response = await fetch(url, {
    method: 'POST',
  });
  const data = await response.json();
  return data.access_token;
};

//get the top 12 streamers
export const getTopStreams = async () => {
  const accessToken = await getAccessToken();
  //get the first 12 items
  const url = 'https://api.twitch.tv/helix/streams?first=12'; 

  const response = await fetch(url, {
    headers: {
      'Client-ID': CLIENT_ID,
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  return data.data; 
};