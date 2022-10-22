import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../config/firebaseMethods";


export default function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    let signupAuth = () => {
        signupUser({ email, password, userName })
            .then((success) => {
                // console.log(success)
                if (success) {
                    navigate("/", {state: userName})

                }
            })
            .catch((error) => {
                console.log(error)
            });
    }
    return (
        <>
            <h1>Sign up</h1>
            <Box style={{ flexDirection: "column" }} >
                <TextField
                    style={{ margin: 12 }}
                    label='User Name'
                    variant="standard"
                    onChange={(e) => setUserName(e.target.value)}
                />
            </Box>
            <Box style={{ flexDirection: "column" }} >
                <TextField
                    style={{ margin: 12 }}
                    label='Email '
                    variant="standard"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Box>
            <Box>
                <TextField
                    label='Password'
                    variant="standard"
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Box>
            <button style={{ margin: 28 }} onClick={signupAuth}>Sign up</button>
            <Box style={{ flex: 1, flexDirection: "row" }}>
                <h4 style={{ margin: 6 }}>Already have an account?</h4>
                <button onClick={() => navigate("/")}>Sign in</button>
            </Box>
        </>
    )
}