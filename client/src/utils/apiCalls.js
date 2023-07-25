import axios from 'axios'

import { SERVER_BASE_URL } from '../constants/server'

const headers = {
    "Content-Type": "application/json"
}

export const login = () => {
    axios.get(
            SERVER_BASE_URL + '/login'
        )
        .catch(err => {
            console.log(err)
        })
}

export const getToken = async (code, setToken, setRefreshToken) => {
    await axios.post(
            SERVER_BASE_URL + '/token', {
                code: code,
                redirect_uri: 'http://localhost:3000/home'
            }
        )
        .then(res => {
            setToken(res.data.access_token)
            setRefreshToken(res.data.refresh_token)
            return res
        })
        .catch(err => {
            console.log(err)
        })
}

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


export const getTopTracks = async (token, timeRange) => {
    // let result = []
    const options = {
        params: {
            access_token: token,
            type: 'tracks',
            time_range: timeRange,
            limit: 50,
        },
        headers: headers
    }
    // not allowed to get the next 50 tracks
    // const options2 = {
    //     params: {
    //         access_token: token,
    //         type: 'tracks',
    //         time_range: timeRange,
    //         limit: 50,
    //         offset: 50
    //     },
    //     headers: headers
    // }

    return axios.get(SERVER_BASE_URL + '/top_items', options)
        .then(async res => {
            return res.data.items

            // return await axios.get(SERVER_BASE_URL + '/top_items', options2)
            //     .then(res => {
            //         result.push(...res.data.items)
            //         console.log(res.data.items)
            //         return result
            //     })
            //     .catch(err => {
            //         console.log(err)
            //     })
        })
        .catch(err => {
            console.log(err)
        })

}

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

export const getArtistTopTracks = async (token, artistID)  => {
    const options = {
        params: {
            access_token: token,
            id: artistID,
            market: 'US'
        },
        headers: headers
    }
    const n = 5
    return axios.get(SERVER_BASE_URL + '/artist_top_tracks', options)
        .then(res => {
            const topTracks = res.data.tracks.length > n ? res.data.tracks.slice(0, n) : res.data.tracks
            return topTracks
        })
        .catch(err => {
            console.log(err)
        })
}

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
