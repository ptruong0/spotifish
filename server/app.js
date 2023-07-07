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
                    console.log(body);
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

app.post('/token', (req, res) => {
    console.log(req.body.redirect_uri)

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
        console.log(response.data.error)
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

console.log('Listening on 5000');
app.listen(5000);