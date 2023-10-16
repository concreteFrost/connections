import axios from 'axios';


function getToken(baseUrl: string, name: string, pass: string) {

    return new Promise((resolve, reject) => {
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        axios
            .post(baseUrl + '/token', {
                grant_type: 'password',
                username: name,
                password: pass,
            }, { headers })
            .then((res) => {
                // setAccessToken(res.data);
                resolve(res);
            })
            .catch(e => {
                reject(e);
            });

    });
}

// username: 'iliaM',
// password: 'cre4min9Tuff'

export default getToken;
