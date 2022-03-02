const getLocalRefreshToken = () => {
    let { user } = getUser();
    return user?.refresh_token;
};

const getLocalAccessToken = () => {
    let { user } = getUser();
    return user?.access_token;
};

const updateLocalAccessToken = (token) => {
    let {user, rememberUser} = getUser();
    user.access_token = token;
    if (rememberUser) {
        localStorage.setItem("user", JSON.stringify(user));
    } else {
        sessionStorage.setItem("user", JSON.stringify(user));
    }
};

const updateLocalRefreshToken = (token) => {
    let {user, rememberUser} = getUser();
    user.refresh_token = token;
    if (rememberUser) {
        localStorage.setItem("user", JSON.stringify(user));
    } else {
        sessionStorage.setItem("user", JSON.stringify(user));
    }
};

const getUser = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    let rememberUser = true;
    if (!user) {
        user = JSON.parse(sessionStorage.getItem("user"));
        rememberUser = false;
    }
    return {user, rememberUser};
};

const setUser = (user, rememberUser) => {
    if (rememberUser) {
        localStorage.setItem("user", JSON.stringify(user));
    } else {
        sessionStorage.setItem("user", JSON.stringify(user));
    }
};

const removeUser = () => {
    localStorage.removeItem("user");
};

const TokenService = {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken,
    updateLocalRefreshToken,
    getUser,
    setUser,
    removeUser,
};

export default TokenService;

