const connectionsPrefix = 'iCon_'

export const setAccessToken = (data: any) => {

    localStorage.setItem(connectionsPrefix + 'access_token', data.access_token)
    localStorage.setItem(connectionsPrefix + 'expires_in', data.expires_in)
    localStorage.setItem(connectionsPrefix + 'expires', data['.expires'])
    localStorage.setItem(connectionsPrefix + 'issued', data['.issued'])
}

export const getAccessToken = () => {

    type sessionType = {
        token: string | null,
        expires_in: string | null,
        expires: string | null,
        issued: string | null,
    }
    const session: sessionType = {
        token: localStorage.getItem(connectionsPrefix + 'access_token'),
        expires_in: localStorage.getItem(connectionsPrefix + 'expires_in'),
        expires: localStorage.getItem(connectionsPrefix + 'expires'),
        issued: localStorage.getItem(connectionsPrefix + 'issued')
    }

    return session;
}