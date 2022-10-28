import { Button, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signinUser } from "../config/firebaseMethods";
import SigninBut from "../utils/Components/MuiLibrary/AlertDialog";
import CircularProgress from "@mui/material/CircularProgress";

export default function Signin() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const handleClose = () => {
        setOpen(false);
    };

    let signinAuth = () => {
        setIsLoading(true)
        signinUser({ email, password })
            .then((success) => {
                if (!!success) {
                    // console.log(success)
                    navigate("/", { state: success.userName })
                }
            })
            .catch((error) => {
                if (!!error) {
                    setOpen(true)
                }
            });
        setIsLoading(false)
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
                {/* <Button style={{ margin: 28 }} onClick={signinAuth}> Sign in </Button> */}
                <SigninBut
                    disabled={isLoading}
                    title={!!isLoading ? <CircularProgress /> : 'sign in'}
                    onClick={signinAuth}
                    open={open}
                    onClose={handleClose}
                />
                <Box style={{ flex: 1, flexDirection: "row" }}>
                    <h4 style={{ margin: 6 }}>Registered not yet?</h4>
                    <Button variant="outlined" onClick={() => navigate("/signup")}>Sign up</Button>
                </Box>
                {/* { singinErr && <h3>{singinErr}</h3>} */}

            </div>
        </>
    )
}