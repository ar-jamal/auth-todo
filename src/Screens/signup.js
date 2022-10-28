import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../config/firebaseMethods";
import CircularProgress from "@mui/material/CircularProgress";


export default function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    let signupAuth = () => {
        setIsLoading(true)
        signupUser({ email, password, userName })
            .then((success) => {
                console.log('success', success)
                // if (success) {
                navigate(`/${success.}`, { state: userName })

                // }
            })
            .catch((error) => {
                console.log('error', error)
            });
        setIsLoading(false)
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
            <Button variant="outlined" style={{ margin: 28 }} onClick={signupAuth}>{!!isLoading ? <CircularProgress /> : "Sign up"}</Button>
            <Box style={{ flex: 1, flexDirection: "row" }}>
                <h4 style={{ margin: 6 }}>Already have an account?</h4>
                <Button
                    disabled={isLoading}
                    variant="outlined"
                    onClick={() => navigate("/")}
                >{!!isLoading ? <CircularProgress /> : "Sign in"}
                </Button>
            </Box>
        </>
    )
}