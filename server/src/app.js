var express = require('express') // Express web server framework
var cors = require('cors')
var cookieParser = require('cookie-parser')
require('dotenv').config()

var { loginSpotify, getCallback, getToken, getRefreshToken } = require('./spotify/auth')
var { getUser, getUserTopItems } = require('./spotify/user')
var { getArtist, getArtistTopTracks, getSimilarArtists } = require('./spotify/artist')
var { getChartData } = require('./musicbrainz/artist')

var app = express()

app.use(cookieParser())

app.use(express.json())
app.use(cors())

const PORT_NUM = 5000

/**
 * Request to login to Spotify, returns redirect to Spotify login page
 */
app.get('/login', loginSpotify)

/**
 * Get access and refresh tokens
 */
app.get('/callback', getCallback)

/**
 * Given a refresh token, request another access token to replace an expired one 
 */
app.get('/refresh_token', getRefreshToken)

/**
 * Request an access token
 */
app.post('/token', getToken)


/**
 * Get information about the currently logged in user
 */
app.get('/user', getUser)

/**
 * Get the current user's top items (tracks or artists specified in query type)
 */
app.get('/top_items', getUserTopItems)


/**
 * Get an artist's information
 */
app.get('/artist', getArtist)

/**
 * Get an artist's top n tracks, given the artist ID
 */
app.get('/artist_top_tracks', getArtistTopTracks)

/**
 * Get a list of artists similar to the specified artist
 */
app.get('/similar_artists', getSimilarArtists)

/**
 * Get additional artist demographic data from MusicBrainz API 
 */
app.get('/artist_charts', getChartData)

app.get('/temp', (req, res) => {
  res.text('It works!')
})


console.log(`Listening on ${process.env.PORT || PORT_NUM}`)
app.listen(process.env.PORT || PORT_NUM)