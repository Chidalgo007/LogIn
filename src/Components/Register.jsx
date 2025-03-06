import {useRef, useState} from "react";
import {register} from "./ManageLog.jsx";
import {FaEye, FaEyeSlash} from 'react-icons/fa';


export const Register = (props) => {
	const {user, setUser} = props
	const emailRef = useRef()
	const [error, displayError] = useState(false)
	const [pass, setPass] = useState('')
	const [rePass, setRePass] = useState('')
	const [passView, setPassView] = useState(false)

	const handleClick = () => {
		setPassView(!passView)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		// const formData = new FormData(e.target)
		// const email = formData.get('email')
		// const password = formData.get('password')
		// const rePassword = formData.get('re-password')

		if (pass === rePass) {
			register(emailRef.current.value, pass, setUser, displayError)
		} else {
			alert("Password don't match")
		}
		emailRef.current.value = ''
		setPass('')
		setRePass('')
	}


	return (
		<div className="full-center flex-col">
			{error && <p className="text-red-500 font-bold text-center text-xs">Email already exists</p>}
			<div className="w-4/5 px-4">
				<h3 className="font-semibold py-2 w-full text-left">Create a personal account</h3>
				<form className="flex flex-col items-center pb-10" onSubmit={handleSubmit}>
					<label htmlFor="email" className="label">Email</label>
					<input ref={emailRef} name="email" type="text" className="input" required/>

					<label htmlFor="password" className="label">Password</label>

					<div className="relative w-full">
						<input
							value={pass}
							onChange={e => setPass(e.target.value)}
							name="password"
							type={passView ? "text" : "password"}
							className="input"
							placeholder={"8 characters, one number,one uppercase"}
							required
							autoComplete="new-password"
						/>
						<span className="eye"
						      onClick={handleClick}>
							{passView ? <FaEye className="w-5 h-5 text-gray-500"/> :
								<FaEyeSlash className="w-5 h-5 text-gray-500"/>}
						</span>
					</div>
					{pass.length > 0 && !pass.match(/^(?=.*\d)(?=.*[A-Z]).{8,}$/) &&
						<p className="text-xs w-full text-left text-red-500">
							8 or more characters, minimum one number and one uppercase
						</p>}


					<label htmlFor="re-password" className="label">Confirm password</label>
					<div className="relative w-full">

						<input
							value={rePass}
							onChange={e => setRePass(e.target.value)}
							name="re-password"
							type={passView ? "text" : "password"}
							className="input"
							required
						/>
						<span className="eye">
							{passView ? <FaEye className="w-5 h-5 text-gray-500"/> :
								<FaEyeSlash className="w-5 h-5 text-gray-500"/>}
						</span>
					</div>
					{rePass.length >= 8 && rePass !== pass &&
						<p className="text-xs text-red-500 w-full text-left">The passwords don&#39;t match</p>}

					<button type="submit" className="btn">Register</button>
				</form>

				<div className="w-full rounded-full border-b border-fuchsia-300"/>
			</div>
		</div>
	)
}