import {forgotPass} from "./ManageLog.jsx";
import {useState} from "react";

export const ForgotPass = (props) => {
	const {clickForgotPass} = props
	const [intructionSend, setIntructionSend] = useState(false)

	const sendInstructions = async (formData) => {
		const email = formData.get('email')
		await forgotPass(email, setIntructionSend)
	}

	return (
		<div className="full-center flex-col">
			{intructionSend &&
				<div className="w-4/5 h-full flex flex-col px-4 py-6 rounded-2xl border border-fuchsia-600">
					<div
						className=" tems-center text-center text-xl font-normal bg-fuchsia-200 rounded-md py-10 px-4">
						<p>
							If an account with that email exists, we will send you instructions to reset your password.
						</p>
						<br/>
						<p className=" text-left">
							<strong>NOTE:</strong> Check your junk email if you don&#39;t see it.
						</p>
					</div>
					<button className="btn" onClick={() => clickForgotPass()}>Go back</button>
				</div>}
			<div className={`w-4/5 px-4 ${intructionSend && 'hidden'}`}>
				<h1 className="font-bold text-2xl pb-2">Forgot Password?</h1>
				<p className="py-6">Enter your email address and we&#39;ll send you a link to reset your password</p>
				<form action={sendInstructions} className="flex flex-col items-center">
					<label name="email" className="label">Email</label>
					<input name="email" type="text" className="input" required/>
					<button type="submit" className="btn">Send instructions</button>
				</form>
				<div className="w-full rounded-full border-b border-fuchsia-300 mt-16 mb-2"/>

				<div className="pt-2 text-sm text-gray-300"> Back to&nbsp;
					<span className="hover:text-orange-600 hover:cursor-pointer text-fuchsia-600"
					      onClick={() => clickForgotPass()}>Log in</span>
				</div>

			</div>
		</div>
	)
}