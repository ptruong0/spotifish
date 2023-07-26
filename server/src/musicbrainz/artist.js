var { wait } = require('../utils/functions')
var { generateChart } = require('../utils/chart')
const { MUSICBRAINZ_BASE_URL } = require('../constants/musicbrainz')

var axios = require('axios')


const getMusicBrainz = async (artistName, index) => {
  // set delay to respect request limit
  await wait(index * 1000)

  return axios.get(MUSICBRAINZ_BASE_URL + `/artist/`, {
    params: {
      query: `artist:${artistName}`,
      fmt: 'json'
    },
    headers: {
      "User-Agent": "Spotifish/1.1.0 ( philtr928@gmail.com )",
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
  })
    .then(response => {
      if (response.statusCode >= 400 || response.data.artists.length == 0) {
        return null
      }

      // only use top result
      return response.data.artists[0]
    })
}

const getChartData = (req, res) => {
  // fetch artist metadata from musicbrainz API
  const artistNames = req.query.artists.split(',')

  return Promise.all(artistNames.map((artistName, index) => {
    // return getArtistMetadata(artist.name, index)
    return getMusicBrainz(artistName, index)
  }))
    .then((values) => {
      const data = generateChart(values)
      res.json(data)
    })
    .catch(err => {
      res.status(500)
      console.log(err)
    })
}

module.exports = {
  getChartData
}