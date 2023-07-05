import axios from 'axios'

function getToken() {
    axios.post('https://iconn.cocoon.technology:9143/iconn/token', {
        grant_type: "password",
        username: "iliaM",
        password: 'cre4min9Tuff'
    }).then((res) => console.log(res)).catch(e => console.log(e))
}

export default getToken;