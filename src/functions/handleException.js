export const handleException = (e) => {
    console.error(e);
    if(e.response && e.response.status === 401) {
        logOut();
    }
}

export const logOut = () => {
    sessionStorage.clear();
    window.location.replace(window.location.pathname);
}