import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const login = () => {
    axios.get(
            BASE_URL + '/login'
        )
        .then()
        .catch(err => {
            console.log(err);
        })
}

export const getToken = async (code, setToken, setRefreshToken) => {
    await axios.post(
            BASE_URL + '/token', {
                code: code,
                redirect_uri: 'http://localhost:3000/home'
            }
        )
        .then(res => {
            setToken(res.data.access_token);
            setRefreshToken(res.data.refresh_token);
            return res;
        })
        .catch(err => {
            console.log(err);
        })
}

export const refreshToken = async (rToken, setToken, setRToken) => {
    await axios.get(
            BASE_URL + '/refresh_token', {
                params: {
                    'refresh_token': rToken
                }
            }
        )
        .then(res => {
            setToken(res.data.access_token);
            setRToken(res.data.refresh_token);
        })
        .catch(err => {
            console.log(err);
        })
}


export const getTopTracks = async (token, timeRange) => {
    // let result = [];
    const options = {
        params: {
            access_token: token,
            type: 'tracks',
            time_range: timeRange,
            limit: 50,
        },
        headers: {
            "Content-Type": "application/json"
        },
    };
    // not allowed to get the next 50 tracks
    // const options2 = {
    //     params: {
    //         access_token: token,
    //         type: 'tracks',
    //         time_range: timeRange,
    //         limit: 50,
    //         offset: 50
    //     },
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    // };

    return axios.get(BASE_URL + '/top_items', options)
        .then(async res => {
            return res.data.items;

            // return await axios.get(BASE_URL + '/top_items', options2)
            //     .then(res => {
            //         result.push(...res.data.items);
            //         console.log(res.data.items)
            //         return result
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     })
        })
        .catch(err => {
            console.log(err);
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
        headers: {
            "Content-Type": "application/json"
        },
    };

    const artists = axios.get(BASE_URL + '/top_items', options)
        .then(res => {
            // setTopArtists(res.data.items);
            return res.data.items;
        })
        .catch(err => {
            console.log(err);
        })
    
    return artists;
}

export const getArtistTopTracks = async (token, artistID, setTracks)  => {
    const options = {
        params: {
            access_token: token,
            id: artistID,
            market: 'US'
        },
        headers: {
            "Content-Type": "application/json"
        },
    };
    const n = 5;
    await axios.get(BASE_URL + '/artist_top_tracks', options)
        .then(res => {
            const topTracks = res.data.tracks.length > n ? res.data.tracks.slice(0, n) : res.data.tracks;
            setTracks(topTracks);
        })
        .catch(err => {
            console.log(err);
        })
}

export const getSimilarArtists = async (token, artistID, setSimilarArtists)  => {
    const options = {
        params: {
            access_token: token,
            id: artistID,
        },
        headers: {
            "Content-Type": "application/json"
        },
    };
    await axios.get(BASE_URL + '/similar_artists', options)
        .then(res => {
            setSimilarArtists(res.data)
        })
        .catch(err => {
            console.log(err);
        })
}

export const getArtistMetadata = async (artistName, index) => {
    const options = {
        params: {
            artist: artistName,
        },
        headers: {
            "Content-Type": "application/json"
        },
    }

    // to stay under request limit 
    return setTimeout(async () => {
        try {
            const res = await axios.get(BASE_URL + '/artist_metadata', options);
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    }, index * 500)

    
}

export const getAllArtistMetadata = async (artists) => {
    return Promise.all(artists.map((artist, index) => {
        return getArtistMetadata(artist.name, index)
    }))
    .then((values) => {
        return values;
    })
    .catch(err => {
        console.log(err);
    })
}

export const getArtist = (token, artistID, setInfo) => {
    const options = {
        params: {
            access_token: token,
            id: artistID,
        },
        headers: {
            "Content-Type": "application/json"
        },
    };
    axios.get(BASE_URL + '/artist', options)
        .then(res => {
            console.log(res.data);
            setInfo(res.data);
        })
        .catch(err => {
            console.log(err);
        })
}

export const getUser = async (token) => {
    const options = {
        params: {
            access_token: token,
        },
        headers: {
            "Content-Type": "application/json"
        },
    };
    return axios.get(BASE_URL + '/user', options)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.log(err);
        })
}
