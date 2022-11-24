/**
 *
 * @returns Authorization header with the user's current
 * token if it exists, else empty
 */
export default function authHeader(teacher) {
    if (teacher) {
        return { Authorization: `Bearer ${teacher.token}` };
    } else {
        // teacher is null
        return {};
    }
}
