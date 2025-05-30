import axios from "axios";
import { baseUrl } from "store/constants/baseUrl";

function getToken(name: string, pass: string) {
  return new Promise((resolve, reject) => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    axios
      .post(
        baseUrl + "/token",
        {
          grant_type: "password",
          username: name,
          password: pass,
        },
        { headers }
      )
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}

// username: 'iliaM',
// password: 'cre4min9Tuff'

export default getToken;
