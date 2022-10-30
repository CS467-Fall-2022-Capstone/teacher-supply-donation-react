
/**
 * 
 * @returns Authorization header with the user's current 
 * token if it exists, else empty
 */
export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
}