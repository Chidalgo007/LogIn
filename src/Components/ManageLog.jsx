// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {
	createUserWithEmailAndPassword,
	getAuth,
	sendEmailVerification,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
	signInWithPopup,  // used to sign in with google
	GoogleAuthProvider,
	FacebookAuthProvider
} from "firebase/auth"

const provider = new GoogleAuthProvider();


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDBf2pn_q_jKrrGSbMZOlvgNmuWCpXXXwQ",
	authDomain: "reactauthlogin-a5679.firebaseapp.com",
	projectId: "reactauthlogin-a5679",
	storageBucket: "reactauthlogin-a5679.firebasestorage.app",
	messagingSenderId: "758480588391",
	appId: "1:758480588391:web:7631cb711d51158061cec2"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Initialize Firebase Authentication
const auth = getAuth(firebaseApp)

// sign in with google
export const signInWithGoogle = async (setUser) => {
	try {
		const result = await signInWithPopup(auth, provider)
		const user = result.user
		setUser(true)
		console.log("sign in with google", user)
	} catch (error) {
		console.log("Error signing in with google ", error.code, error.message)
		console.log("Error signing in with google ", error.code, error.customData.email)
	}
}

// create user with email & passwords
export const register = async (email, password, setUser, displayError) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password)
		console.log("register", userCredential.user)
		await verifyEmail()
		// email verification status
		const interval = setInterval(async () => {
			await auth.currentUser.reload()
			if (auth.currentUser.emailVerified) {
				setUser(true)
				clearInterval(interval)
				console.log("email verified")
			}
		}, 3000)

	} catch (error) {
		displayError(true)
		console.log("Error register user ", error.code, error.message)
	}
}
// sign in with email & password
export const signIn = async (email, password, displayError, setUser) => {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password)
		if (auth.currentUser.emailVerified) {
			setUser(true)
		} else {
			verifyEmail()
			alert("Please verified your email before login")
		}
	} catch (error) {
		displayError(true)
		console.log("Error signing in ", error.code, error.message)
	}
}

// verify email
const verifyEmail = async () => {
	if (auth.currentUser) {
		await sendEmailVerification(auth.currentUser)
	}
}

// reset password
export const forgotPass = async (email, setIntructionSend) => {
	try {
		await sendPasswordResetEmail(auth, email)
		setIntructionSend(true)
		console.log("Please check your email to reset your password")
	} catch (error) {
		console.log("Error sending reset password email ", error.code, error.message)
		setIntructionSend(false)
	}
}

//log out
export const logOut = async (setUser) => {
	try {
		await signOut(auth)
		setUser(false)
		console.log("log out")
	} catch (error) {
		console.log("Error signing out ", error.code, error.message)
	}
}

