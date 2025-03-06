import {signIn, signInWithGoogle} from "./ManageLog.jsx"
import {useRef, useState} from "react";
import {FaEye, FaEyeSlash} from "react-icons/fa";

export const LogIn = (props) => {
	const {clickForgotPass, user, setUser} = props
	const [error, displayError] = useState(false)
	const [passView, setPassView] = useState(false)
	const emailRef = useRef()
	const passRef = useRef()

	const handleClick = async (e) => {
		e.preventDefault()
		let email = emailRef.current.value
		let password = passRef.current.value

		await signIn(email, password, displayError, setUser)
		email = ''
		password = ''
	}

	const handlePassView = () => {
		setPassView(!passView)
	}

	return (
		<div className="full-center flex-col">
			<div className="w-4/5 px-4">
				{error &&
					<p className="text-red-500 font-bold text-xs">Email and passwords don&#39;t match, try again!</p>}
				<form action="" className="flex flex-col items-center" onSubmit={handleClick}>
					<label name="email" className="label">Email</label>
					<input name="email" ref={emailRef} type="text" className="input" required/>

					<label name="password" className="label">Password</label>
					<div className="relative w-full">
						<input name="password"
						       ref={passRef}
						       type={passView ? "text" : "password"}
						       className="input"
						       required
						/>
						<span className="eye"
						      onClick={handlePassView}>
							{passView ? <FaEye className="w-5 h-5 text-gray-500"/> :
								<FaEyeSlash className="w-5 h-5 text-gray-500"/>}
						</span>
					</div>

					<div className="cursor-pointer w-full pt-2 text-semibold text-left text-sm text-indigo-700"
					     onClick={() => clickForgotPass()}>Forgotten password?
					</div>

					<div className="w-full flex justify-start">
						<label name="remember" className=" flex items-center pt-4 text-sm font-semibold">

							<input
								type="checkbox"
								name="myCheckbox"
								className="appearance-none w-5 h-5 mr-2 rounded border-2 border-fuchsia-300  bg-fuchsia-200 checked:border-fuchsia-600 focus:border-fuchsia-600 relative
								after:content-['✔'] after-text-black after:absolute after:top-[-2px] after:left-[1px] after:text-xs after:hidden checked:after:block"/>
							Remember me
						</label>
					</div>
					<button name="logInBtn" type="submit" className="btn">Log In</button>
				</form>

				{/*other sign in options*/}
				<div className="flex flex-col justify-center items-center gap-3 mt-10">
					<button className="w-[200px]" onClick={() => signInWithGoogle(setUser)}>
						<img src="img/google.png" alt="google" className=""/>
					</button>
				</div>
			</div>
		</div>
	)
}