import { createContext, useContext, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [teacher, setTeacher] = useLocalStorage('teacher', null);
    // Set authenticated user
    const logIn = (data) => {
        setTeacher(data);
        console.log(data);
        return <Navigate to='/teachers/dashboard' />;
    };

    // Sign out user
    const logOut = () => {
        setTeacher(null);
        return <Navigate to='/login' replace />;
    };

    // const teacherAuthRequest = () => {
    //     return axios.get(API_URL + '/api/teachers/' + teacher._id, {
    //         headers: authHeader(teacher),
    //     });
    // };

    const value = useMemo(
        () => ({
            teacher,
            logIn,
            logOut,
            setTeacher,
        }),
        [teacher]
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
