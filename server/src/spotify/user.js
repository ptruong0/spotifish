var { SPOTIFY_BASE_URL } = require('../constants/spotify');

var axios = require('axios');

const getUser = (req, res) => {
  const accessToken = req.query.access_token;

  axios.get(SPOTIFY_BASE_URL + `/me`, {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
  })
    .then(response => {
      res.json(response.data)
    })
    .catch(err => {
      res.status(500);
      console.log(err);
    })
}

const getUserTopItems = (req, res) => {
  const accessToken = req.query.access_token;
  const type = req.query.type; // tracks or artists
  const time_range = req.query.time_range;
  const limit = req.query.limit;
  const offset = req.query.offset ? req.query.offset : 0;

  axios.get(SPOTIFY_BASE_URL + `/me/top/${type}`, {
    params: {
      limit: limit,
      time_range: time_range,
      offset: offset
    },
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
  })
    .then(response => {
      if (response.statusCode >= 400) {
        res.status(401);
        res.send('Token expired')
      }
      // console.log(response)
      res.json(response.data)
    })
    .catch(err => {
      res.status(500);
      console.log(err);
    })
}

module.exports = {
  getUser,
  getUserTopItems
}