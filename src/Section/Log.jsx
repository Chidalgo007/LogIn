import {useState} from "react"
import {LogIn} from "../Components/LogIn.jsx";
import {Register} from "../Components/Register.jsx";
import {ForgotPass} from "../Components/ForgotPass.jsx";

export const Log = (props) => {
	const {user, setUser} = props
	const [account, setAccount] = useState(true)
	const [forgotPass, setForgotPass] = useState(false)
	const screenHeight = window.innerHeight

	const clickForgotPass = () => {
		setForgotPass(!forgotPass)
	}


	return (
		<div
			className="w-screen h-screen bg-[radial-gradient(circle,_#350359,_#e0c4f5)] flex justify-center items-center">
			<div className={`relative rounded-2xl md:w-4/6 w-4/5 h-5/6 max-h-[600px] ${screenHeight <= 600 && 'h-[90%]'}  overflow-hidden`}>
				<div className=" lg:w-1/2 w-0 h-full absolute left-0 flex justify-center items-center">
					<img src="img/2.png" alt="coffee truck" className="w-full"/>
				</div>
				<div
					className={`absolute right-0 flex flex-col lg:w-1/2 h-full w-full justify-center items-center rounded-2xl`} style={{background : "rgb(255,255,255,0.3)"}}>
					<h1 className={`font-bold text-2xl w-4/5 px-4 pb-2 text-left ${forgotPass && 'hidden'}`}>
						{account && 'Log in'}</h1>
					<div
						className={`w-full justify-center items-center flex ${account ? 'flex-col-reverse' : 'flex-col'}`}>

						<div className="w-full">
							{account && !forgotPass && <LogIn
								clickForgotPass={clickForgotPass}
								user={user} setUser={setUser}
							/>}
							{!account && !forgotPass && <Register user={user} setUser={setUser}/>}
							{forgotPass && <ForgotPass clickForgotPass={clickForgotPass}/>}
						</div>

						<div
							className={`w-4/5 flex items-center justify-start px-4 text-gray-600 ${account ? 'py-4' : 'pt-1'} ${forgotPass && 'hidden'}`}>
							<p className="sm:text-sm text-[10px] text-gray-300">{account ? "New to Coffee & Cupcake?" : "Already have an account?"}
								&nbsp;</p>
							<span className="hover:text-orange-600 hover:cursor-pointer text-fuchsia-600 sm:text-sm text-[10px]"
							      onClick={() => {
								      setAccount(!account)
								      forgotPass ? setForgotPass(false) : ''
							      }}>
								{account ? 'Register now' : 'Log in'}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
