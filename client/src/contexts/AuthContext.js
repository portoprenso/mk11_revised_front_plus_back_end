import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import Cookies from "js-cookie";
import firebase from "firebase";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

// const INIT_STATE={

// }
// const reducer =(state=INIT_STATE,action)=>{
//     switch(action.type){
//         case '...':
//         default: return state}
// }

export function AuthProvider({ children }) {
    // const [state,dispatch] = useReducer(reducer,INIT_STATE)
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        Cookies.set("isLogged", "123");
        return auth.signInWithEmailAndPassword(email, password);
    }

    const loginWithGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        const { user } = await auth.signInWithPopup(provider);
        console.log(user);
    };

    function logout() {
        return auth.signOut();
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email);
    }

    // function cookieExpireDate() {
    //     let newDate = Date.now()
    //     newDate = new Date(newDate).toUTCString()
    //     return newDate
    // }

    function createCookie(mail) {
        Cookies.set("isLogged", "123", { expires: 2 });
        console.log(Cookies.set);
        Cookies.set(123, 321);
    }

    const setCookie = (name = "123", value = "string", expires = 12) => {
        Cookies.set(name, value, { expires });
    };

    function receiveCookie() {
        let some = Cookies.get("isLogged");
        console.log(some);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        receiveCookie,
        createCookie,
        setCookie,
        loginWithGoogle,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
