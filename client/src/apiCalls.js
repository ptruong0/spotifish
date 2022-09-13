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


export const getTopTracks = (token, setTopTracks) => {
    let result = [];
    const options = {
        params: {
            access_token: token,
            type: 'tracks',
            time_range: 'medium_term',
            limit: 50
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
    axios.get(BASE_URL + '/top_items', options)
        .then(res => {
            console.log(res)
            console.log(res.data.items);
            result.push(...res.data.items);

            axios.get(BASE_URL + '/top_items', options2)
                .then(res => {
                    console.log(res)
                    console.log(res.data.items);
                    result.push(...res.data.items);

                })
                .catch(err => {
                    console.log(err);
                    alert('Server error')
                })

        })
        .catch(err => {
            console.log(err);
            alert('Server error')
        })



    setTopTracks(result);
    console.log(result);

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

    axios.get(BASE_URL + '/top_items', options)
        .then(res => {
            console.log(res.data.items);
            setTopArtists(res.data.items);
        })
        .catch(err => {
            console.log(err);
            alert('Server error')
        })
}