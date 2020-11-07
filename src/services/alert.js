import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Alert extends Component 
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
			toast.info(mssg);
		} 
	}

	export default Alert;