const connectionsPrefix = 'iCon_'

export const setAccessToken = (data: any, userName: string) => {
    localStorage.setItem(connectionsPrefix + 'access_token', data.access_token)
    localStorage.setItem(connectionsPrefix + 'expires_in', data.expires_in)
    localStorage.setItem(connectionsPrefix + 'expires', data['.expires'])
    localStorage.setItem(connectionsPrefix + 'issued', data['.issued'])
    localStorage.setItem(connectionsPrefix + 'is_logged_in', true.toString())
    localStorage.setItem(connectionsPrefix + 'userName', userName);
}

export const getAccessToken = () => {

    type sessionType = {
        token: string | null,
        expires_in: string | null,
        expires: string | null,
        issued: string | null,
        is_logged_in: string | null,
        userName: string | null
    }

    const session: sessionType = {
        token: localStorage.getItem(connectionsPrefix + 'access_token'),
        expires_in: localStorage.getItem(connectionsPrefix + 'expires_in'),
        expires: localStorage.getItem(connectionsPrefix + 'expires'),
        issued: localStorage.getItem(connectionsPrefix + 'issued'),
        is_logged_in: localStorage.getItem(connectionsPrefix + "is_logged_in"),
        userName: localStorage.getItem(connectionsPrefix + "userName")
    }

    return session;
}

export const clearUserData = () => {
    Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(connectionsPrefix)) {
            localStorage.removeItem(key);
        }
    });
};