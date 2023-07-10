import axios from 'axios';
import { setAccessToken, getAccessToken } from '../../store/actions/storageActions';


function getToken(baseUrl: string) {
    const tokenInfo = getAccessToken();



    return new Promise((resolve, reject) => {

        if (!tokenInfo.token || (tokenInfo.token && (!tokenInfo.expires || new Date() > new Date(tokenInfo.expires)))) {
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
            };
            axios
                .post(baseUrl + '/token', {
                    grant_type: 'password',
                    username: 'iliaM',
                    password: 'cre4min9Tuff',
                }, { headers })
                .then((res) => {
                    console.log(res);
                    alert('New token was granted');
                    setAccessToken(res.data);
                    resolve(true);
                })
                .catch(e => {
                    console.log(e);
                    reject(false);
                });
        } else {
            resolve(true);
        }
    });
}

export default getToken;
