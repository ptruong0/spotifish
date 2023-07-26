const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1'
const client_id = process.env.SPOTIFY_ID // Your client id
const client_secret = process.env.SPOTIFY_SECRET // Your secret
const redirect_uri = 'http://localhost:3000/home' // Your redirect uri
const state_key = 'spotify_auth_state'


module.exports = {
  SPOTIFY_BASE_URL,
  client_id,
  client_secret,
  redirect_uri,
  state_key
}