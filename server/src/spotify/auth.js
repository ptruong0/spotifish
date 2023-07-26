var { client_id, client_secret, redirect_uri, state_key } = require('../constants/spotify')
var { generateRandomString } = require('../utils/functions')

var axios = require('axios')
var querystring = require('querystring')


const loginSpotify = (req, res) => {
  var state = generateRandomString(16)
  res.cookie(state_key, state)

  const show_dialog = req.query.show_dialog

  // your application requests authorization
  var scope = 'user-read-private user-read-email user-top-read'
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state,
      show_dialog: show_dialog
    }))
}

const getCallback = (req, res) => {

  // your application requests refresh and access tokens
  // after checking the state parameter
  var code = req.query.code || null
  var state = req.query.state || null
  var storedState = req.cookies ? req.cookies[state_key] : null

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }))
  } else {
    res.clearCookie(state_key)
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    }

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
          refresh_token = body.refresh_token

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        }

        // use the access token to access the Spotify Web API
        request.get(options, function (error, response, body) {
        })

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }))
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }))
      }
    })
  }
}

const getToken = (req, res) => {
  console.log(req.body.code)
  axios.post('https://accounts.spotify.com/api/token', null, {
    params: {
      code: req.body.code,
      redirect_uri: req.body.redirect_uri,
      grant_type: 'authorization_code',
      client_id: client_id,
      client_secret: client_secret,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(response => {
      // console.log(response.data)
      res.json(response.data)
    })
    .catch(err => {
      console.log(err)
      res.status(500)
    })
}

const getRefreshToken = (req, res) => {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  }

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token,
        refresh_token = body.refresh_token
      res.send({
        'access_token': access_token,
        'refresh_token': refresh_token
      })
    }
  })
}

module.exports = {
  loginSpotify,
  getCallback,
  getToken,
  getRefreshToken
}