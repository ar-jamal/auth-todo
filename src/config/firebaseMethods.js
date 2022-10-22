import app from "./firebaseConfig";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";

// import { Password } from "@mui/icons-material";
const db = getDatabase(app);
const auth = getAuth(app)
let signupUser = (obj) => {
    let { email, password, userName } = obj
    return new Promise((resolve, reject) => {
        // console.log(email)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const reference = ref(db, `users/${user.uid}`)
                set(reference, obj)
                    .then(() => {
                        resolve("credentials submitted successfully")
                    })
                    .catch((errr) => {
                        reject(errr)
                    })
            })
            .catch((err) => {
                reject(err)
            })

    })
}
let signinUser = (obj) => {
    let { email, password } = obj;
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                const reference = ref(db, `users/${user.uid}`)
                onValue(reference, (data) => {
                    // console.log(data.val())
                    const userExist = data.exists();
                    if (userExist) {
                        resolve(data.val())
                    } else {
                        reject("error in sent details")
                    }
                })
            })
            .catch((errr) => {
                const errorCode = errr.code
                const errorMessage = errr.message
                reject(errorMessage)
            })
    })
}
const logout =() => {
    signOut(auth)
}
export { signupUser, signinUser, logout };