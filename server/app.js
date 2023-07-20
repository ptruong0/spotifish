var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var axios = require('axios');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
require('dotenv').config();

var client_id = process.env.SPOTIFY_ID; // Your client id
var client_secret = process.env.SPOTIFY_SECRET; // Your secret
var redirect_uri = 'http://localhost:3000/home'; // Your redirect uri

const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';
const MUSICBRAINZ_BASE_URL = 'https://musicbrainz.org/ws/2';


/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

app.use(cookieParser());

app.use(express.json())
app.use(cors());


/**
 * Request to login to Spotify, returns redirect to Spotify login page
 */
app.get('/login', function(req, res) {

    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    var scope = 'user-read-private user-read-email user-top-read';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
});

/**
 * Get access and refresh tokens
 */
app.get('/callback', function(req, res) {

    // your application requests refresh and access tokens
    // after checking the state parameter
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        res.clearCookie(stateKey);
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
        };

        request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {

                var access_token = body.access_token,
                    refresh_token = body.refresh_token;

                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                };

                // use the access token to access the Spotify Web API
                request.get(options, function(error, response, body) {
                });

                // we can also pass the token to the browser to make requests from there
                res.redirect('/#' +
                    querystring.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token
                    }));
            } else {
                res.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        });
    }
});


/**
 * Given a refresh token, request another access token to replace an expired one 
 */
app.get('/refresh_token', function(req, res) {

    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token,
                refresh_token = body.refresh_token;
            res.send({
                'access_token': access_token,
                'refresh_token': refresh_token
            });
        }
    });
});

/**
 * Request an access token
 */
app.post('/token', (req, res) => {
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
            console.log(err);
            res.status(500);
        })
})

/**
 * Get the current user's top items (tracks or artists specified in query type)
 */
app.get('/top_items', (req, res) => {
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
})

/**
 * Get an artist's top n tracks, given the artist ID
 */
app.get('/artist_top_tracks', (req, res) => {
    const accessToken = req.query.access_token;
    const market = req.query.market;
    const id = req.query.id;
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
})


/**
 * Get an artist's top n tracks, given the artist ID
 */
app.get('/similar_artists', (req, res) => {
    const accessToken = req.query.access_token;
    const id = req.query.id;
    axios.get(SPOTIFY_BASE_URL + `/artists/${id}/related-artists`, {
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
        res.json(response.data.artists.slice(0, 5))
    })
    .catch(err => {
        res.status(500);
        console.log(err);
    })
})

app.get('/artist_metadata', (req, res) => {
    const artistName = req.query.artist;
    axios.get(MUSICBRAINZ_BASE_URL + `/artist/`, {
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
        if (response.statusCode >= 400) {
            res.status(401);
            res.send('Token expired')
        }
        if (response.data.artists.length == 0) {
            res.status(404);
            res.send('No artist found')
        }
        // console.log(response)
        res.json(response.data.artists[0])
    })
    .catch(err => {
        res.status(500);
        console.log(err);
    })
})


/**
 * Get an artist's information
 */
app.get('/artist', (req, res) => {
    const accessToken = req.query.access_token;
    const id = req.query.id;
    axios.get(SPOTIFY_BASE_URL + `/artists/${id}`, {
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
})

/**
 * Get information about the currently logged in user
 */
app.get('/user', (req, res) => {
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
})

console.log('Listening on 5000');
app.listen(5000);