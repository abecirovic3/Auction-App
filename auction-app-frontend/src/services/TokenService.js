function getLocalRefreshToken() {
    let { user } = getUser();
    return user?.refresh_token;
}

function getLocalAccessToken() {
    let { user } = getUser();
    return user?.access_token;
}

function updateLocalAccessToken(token) {
    let {user, rememberUser} = getUser();
    user.access_token = token;
    if (rememberUser) {
        localStorage.setItem('user', JSON.stringify(user));
    } else {
        sessionStorage.setItem('user', JSON.stringify(user));
    }
}

function updateLocalRefreshToken(token) {
    let {user, rememberUser} = getUser();
    user.refresh_token = token;
    if (rememberUser) {
        localStorage.setItem('user', JSON.stringify(user));
    } else {
        sessionStorage.setItem('user', JSON.stringify(user));
    }
}

function getUserCredentials() {
    const { user } = getUser();
    return user?.credentials;
}

function getUser() {
    let user = JSON.parse(localStorage.getItem('user'));
    let rememberUser = true;
    if (!user) {
        user = JSON.parse(sessionStorage.getItem('user'));
        rememberUser = false;
    }
    return {user, rememberUser};
}

function setUser(user, rememberUser) {
    if (rememberUser) {
        localStorage.setItem('user', JSON.stringify(user));
    } else {
        sessionStorage.setItem('user', JSON.stringify(user));
    }
}

function removeUser() {
    localStorage.removeItem('user');
}

const TokenService = {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken,
    updateLocalRefreshToken,
    getUserCredentials,
    getUser,
    setUser,
    removeUser,
};

export default TokenService;

