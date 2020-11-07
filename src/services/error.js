import React, {Component} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ErrorAlert extends Component
{
	render()
	{
		return(
			<div>
				<ToastContainer 
					position="top-center"
					type="info" 
				/>
			</div>
			)
	}
		throwAlert(mssg)
		{
			toast.error(mssg);		
		} 
}
export default ErrorAlert;