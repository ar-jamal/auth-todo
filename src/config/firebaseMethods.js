import app from "./firebaseConfig";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, onValue, push } from "firebase/database";

// import { Password } from "@mui/icons-material";
const db = getDatabase(app);
const auth = getAuth(app)
let signupUser = async (obj) => {
    let { email, password, userName } = obj
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;
        const reference = ref(db, `users/${user.uid}`)
        obj.id = user.uid;
        await set(reference, obj)
        return "credentials submitted successfully"

    } catch (error) {
        throw error;
    }
}
// let signupUser = (obj) => {
//     let { email, password, userName } = obj
//     return new Promise((resolve, reject) => {
//         // console.log(email)
//         createUserWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//                 const user = userCredential.user;
//                 const reference = ref(db, `users/${user.uid}`)
//                 set(reference, obj)
//                     .then(() => {
//                         resolve("credentials submitted successfully")
//                     })
//                     .catch((errr) => {
//                         reject(errr)
//                     })
//             })
//             .catch((err) => {
//                 reject(err)
//             })

//     })
// }
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
const logout = () => {
    signOut(auth)
}

const send = () => {
    return new Promise((resolve, reject) => {
        // const reference = ref(db, `user/${user.uid}/`)
        // // const postListRef = ref(db, {"Posts"})
        // const newPostRef = push(postListRef)
    })
}
export { signupUser, signinUser, logout };