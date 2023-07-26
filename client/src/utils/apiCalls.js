import axios from 'axios'

import { SERVER_BASE_URL, TOP_N_TRACKS, ARTIST_TOP_N_TRACKS, REDIRECT_URI } from '../constants/server'


const headers = {
    "Content-Type": "application/json"
}

/**
 * Request to login to Spotify, returns redirect to Spotify login page
 */
export const login = (ahowDialog) => {
    axios.get(
            SERVER_BASE_URL + '/login', {
                params: {
                    'show_dialog': true
                }
            }
        )
        .catch(err => {
            console.log(err)
        })
}

/**
 * Request an access token
 */
export const getToken = async (code) => {
    return axios.post(
            SERVER_BASE_URL + '/token', {
                code: code,
                redirect_uri: REDIRECT_URI
            }
        )
        .then(res => {
            return res
        })
        .catch(err => {
            console.log(err)
        })
}

/**
 * Given a refresh token, request another access token to replace an expired one 
 */
export const refreshToken = async (rToken, setToken, setRToken) => {
    await axios.get(
            SERVER_BASE_URL + '/refresh_token', {
                params: {
                    'refresh_token': rToken
                }
            }
        )
        .then(res => {
            setToken(res.data.access_token)
            setRToken(res.data.refresh_token)
        })
        .catch(err => {
            console.log(err)
        })
}

/**
 * Get the current user's top (50) tracks
 */
export const getTopTracks = async (token, timeRange) => {
    // let result = []
    const options = {
        params: {
            access_token: token,
            type: 'tracks',
            time_range: timeRange,
            limit: TOP_N_TRACKS,
        },
        headers: headers
    }

    return axios.get(SERVER_BASE_URL + '/top_items', options)
        .then(async res => {
            return res.data.items
        })
        .catch(err => {
            console.log(err)
        })

}

/**
 * Get the current user's top n artists
 */
export const getTopArtists = async (token, numArtists, timeRange) => {
    const options = {
        params: {
            access_token: token,
            type: 'artists',
            time_range: timeRange,
            limit: numArtists
        },
        headers: headers
    }
    const artists = axios.get(SERVER_BASE_URL + '/top_items', options)
        .then(res => {
            // setTopArtists(res.data.items)
            return res.data.items
        })
        .catch(err => {
            console.log(err)
        })
    
    return artists
}

/**
 * Get an artist's top n tracks, given the artist ID
 */
export const getArtistTopTracks = async (token, artistID)  => {
    const options = {
        params: {
            access_token: token,
            id: artistID,
            market: 'US'
        },
        headers: headers
    }
    const n = ARTIST_TOP_N_TRACKS

    return axios.get(SERVER_BASE_URL + '/artist_top_tracks', options)
        .then(res => {
            const topTracks = res.data.tracks.length > n ? res.data.tracks.slice(0, n) : res.data.tracks
            return topTracks
        })
        .catch(err => {
            console.log(err)
        })
}

/**
 * Get a list of artists similar to the specified artist
 */
export const getSimilarArtists = async (token, artistID)  => {
    const options = {
        params: {
            access_token: token,
            id: artistID,
        },
        headers: headers
    }
    return axios.get(SERVER_BASE_URL + '/similar_artists', options)
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

/**
 * Get additional artist demographic data from MusicBrainz API 
 * Return as chart data
 */
export const getArtistChartData = async (artists) => {
    const options = {
        params: {
            artists: artists.map(a => a.name).join(','),
        },
        headers: headers
    }
    
    return axios.get(SERVER_BASE_URL + '/artist_charts', options)
    .then(res => {
        console.log(res.data)        
        return res.data
    })
    .catch(err => {
        console.log(err)
    })
}

/**
 * Get an artist's information
 */
export const getArtist = async (token, artistID) => {
    const options = {
        params: {
            access_token: token,
            id: artistID,
        },
        headers: headers
    }
    return axios.get(SERVER_BASE_URL + '/artist', options)
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

/**
 * Get information about the currently logged in user
 */
export const getUser = async (token) => {
    const options = {
        params: {
            access_token: token,
        },
        headers: headers
    }
    return axios.get(SERVER_BASE_URL + '/user', options)
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}
