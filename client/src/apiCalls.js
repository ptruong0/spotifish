import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const login = () => {
    axios.get(
            BASE_URL + '/login'
        )
        .then()
        .catch(err => {
            console.log(err);
            alert('Server error')
        })
}

export const getToken = (code, setToken, setRefreshToken) => {
    axios.post(
            BASE_URL + '/token', {
                code: code,
                redirect_uri: 'http://localhost:3000/home'
            }
        )
        .then(res => {
            console.log(res);
            setToken(res.data.access_token);
            setRefreshToken(res.data.refresh_token);

        })
        .catch(err => {
            console.log(err);
            alert('Server error')
        })
}

export const refreshToken = (rToken, setToken, setRToken) => {
    axios.get(
            BASE_URL + '/refresh_token', {
                params: {
                    'refresh_token': rToken
                }
            }
        )
        .then(res => {
            console.log(res);
            setToken(res.data.access_token);
            setRToken(res.data.refresh_token);
        })
        .catch(err => {
            console.log(err);
            alert('Server error')
        })
}


export const getTopTracks = async (token, setTopTracks) => {
    let result = [];
    const options = {
        params: {
            access_token: token,
            type: 'tracks',
            time_range: 'medium_term',
            limit: 50,
        },
        headers: {
            "Content-Type": "application/json"
        },
    };
    const options2 = {
        params: {
            access_token: token,
            type: 'tracks',
            time_range: 'medium_term',
            limit: 50,
            offset: 50
        },
        headers: {
            "Content-Type": "application/json"
        },
    };

    await axios.get(BASE_URL + '/top_items', options)
        .then(async res => {
            console.log(res)
            console.log(res.data.items);
            result.push(...res.data.items);

            await axios.get(BASE_URL + '/top_items', options2)
                .then(res => {
                    console.log(res)
                    console.log(res.data.items);
                    result.push(...res.data.items);

                    setTopTracks(result);
                    console.log(result);
                })
                .catch(err => {
                    console.log(err);
                    // alert('Server error')
                })

        })
        .catch(err => {
            console.log(err);
            // alert('Server error')
        })

}

export const getTopArtists = (token, setTopArtists) => {
    const options = {
        params: {
            access_token: token,
            type: 'artists',
            time_range: 'medium_term',
            limit: 20
        },
        headers: {
            "Content-Type": "application/json"
        },
    };

    const artists = axios.get(BASE_URL + '/top_items', options)
        .then(res => {
            console.log(res.data.items);
            setTopArtists(res.data.items);
            return res.data.items;
        })
        .catch(err => {
            console.log(err);
            alert('Server error')
        })
    
    return artists;
}

export const getArtistTopTracks = (token, artistID, setTracks)  => {
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
    axios.get(BASE_URL + '/artist_top_tracks', options)
        .then(res => {
            console.log(res.data);
            const result = res.data.tracks.length > n ? res.data.tracks.slice(0, n) : res.data.tracks;
            setTracks(result);
        })
        .catch(err => {
            console.log(err);
            alert('Server error')
        })
}

export const getUser = async (token, setUser) => {
    const options = {
        params: {
            access_token: token,
        },
        headers: {
            "Content-Type": "application/json"
        },
    };
    await axios.get(BASE_URL + '/user', options)
    .then(res => {
        console.log(res.data);
        setUser(res.data);
    })
    .catch(err => {
        console.log(err);
        alert('Server error')
    })
}