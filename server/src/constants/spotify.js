const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1'
const client_id = process.env.SPOTIFY_ID 
const client_secret = process.env.SPOTIFY_SECRET
const redirect_uri = `${process.env.CLIENT_URL}/home` || 'http://localhost:3000/home' 
const state_key = 'spotify_auth_state'


module.exports = {
  SPOTIFY_BASE_URL,
  client_id,
  client_secret,
  redirect_uri,
  state_key
}