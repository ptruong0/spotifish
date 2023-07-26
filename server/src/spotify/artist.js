var { SPOTIFY_BASE_URL } = require('../constants/spotify')

var axios = require('axios')


const getArtist = (req, res) => {
  const accessToken = req.query.access_token
  const id = req.query.id
  axios.get(SPOTIFY_BASE_URL + `/artists/${id}`, {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
  })
    .then(response => {
      if (response.statusCode >= 400) {
        res.status(401)
        res.send('Token expired')
      }
      // console.log(response)
      res.json(response.data)
    })
    .catch(err => {
      res.status(500)
      console.log(err)
    })
}

const getArtistTopTracks = (req, res) => {
  const accessToken = req.query.access_token
  const market = req.query.market
  const id = req.query.id
  axios.get(SPOTIFY_BASE_URL + `/artists/${id}/top-tracks`, {
    params: {
      market: market
    },
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
  })
    .then(response => {
      if (response.statusCode >= 400) {
        res.status(401)
        res.send('Token expired')
      }
      // console.log(response)
      res.json(response.data)
    })
    .catch(err => {
      res.status(500)
      console.log(err)
    })
}

const getSimilarArtists = (req, res) => {
  const accessToken = req.query.access_token
  const id = req.query.id
  axios.get(SPOTIFY_BASE_URL + `/artists/${id}/related-artists`, {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
  })
    .then(response => {
      if (response.statusCode >= 400) {
        res.status(401)
        res.send('Token expired')
      }
      res.json(response.data.artists.slice(0, 5))
    })
    .catch(err => {
      res.status(500)
      console.log(err)
    })
}

module.exports = {
  getArtist,
  getArtistTopTracks,
  getSimilarArtists
}