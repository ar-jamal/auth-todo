import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Home from "../Screens/home";
import Signin from "../Screens/singin";
import Signup from "../Screens/signup";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

function AppRouter() {
    const [loggedIn, setLoggedIn] = useState(false)
    useEffect(() => {
        const onAuthSubs = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedIn(true)
            } else {
                setLoggedIn(false)
            }
        }
        );
        return () => {
            onAuthSubs();
        }
    }, [])

    return (
        <Router>
            <Routes>
                {
                    loggedIn ?
                        <>
                            <Route path="/" index element={<Home />} />
                        </>
                        : <>
                            <Route path="/*" element={<Signin />} />
                            <Route path="signup/*" element={<Signup />} />

                        </>
                }
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    )
}
export { AppRouter }