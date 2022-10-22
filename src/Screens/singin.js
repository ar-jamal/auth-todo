import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signinUser } from "../config/firebaseMethods";

export default function Signin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    let signinAuth = () => {
        signinUser({ email, password })
            .then((success) => {
                if (!!success) {
                    // console.log(success)
                    navigate("/", {state: success.userName})
                }
            })
            .catch((error) => {
                var singinErr= error
            });
    }
    return (
        <>
            <div>

                <h1>Sign in</h1>
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
                <button style={{ margin: 28 }} onClick={signinAuth}> Sign in </button>
                <Box style={{ flex: 1, flexDirection: "row" }}>
                    <h4 style={{ margin: 6 }}>Registered not yet?</h4>
                    <button onClick={() => navigate("/signup")}>Sign up</button>
                </Box>
            </div>
        </>
    )
}