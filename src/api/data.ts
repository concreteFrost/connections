import axios, { AxiosResponse } from "axios";
import { getAccessToken } from "../store/actions/storageActions";

//https://iconn.cocoon.technology:9143/iconn
export function getBlocks(baseUrl: string): Promise<any> {

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + getAccessToken().token

    };

    return new Promise<any>((resolve, reject) => {
        axios.get(baseUrl + '/data/blocklist', { headers })
            .then((res: AxiosResponse<any>) => {
                resolve(res.data)
            })
            .catch(e => {
                console.log(e);
                reject(e)
            })
    })

}

