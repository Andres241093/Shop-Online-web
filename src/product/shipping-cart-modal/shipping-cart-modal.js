import React, { Component } from 'react';
import './shipping-cart-modal.css';
import API from '../../config/env';
import token from '../../services/token';
import money from './money.svg';

class ShippingCartModal extends Component 
{
	constructor(props){
		super(props);
		this.state ={
			shippingCart: this.props.shippingCart,
			closeModal: this.props.onClickCloseModal,
			shippingOptionTotal: 0
		}
		this.changePickUpState = this.changePickUpState.bind(this);
		this.changeUsdState = this.changeUsdState.bind(this);
	}

	render()
	{
		let payBtn;
		let isEmpty;
		if (this.state.shippingCart.length != 0) {
			payBtn =
			<div> 
				<div>
					<h3>Shopping option: </h3>
					<label>
						<span>Pick up ($ 0)</span>	
						<input type="radio" name="star" value="star_1" onClick={this.changePickUpState} required/>
					</label>
					<label>
						<span>USD ($ 5)</span>	
						<input type="radio" name="star" value="star_1" onClick={this.changeUsdState} />
					</label>
				</div>

				<div className="pay-btn-div">
					<button type="submit" className="pay-button">
						<img src={money} className="btn-money-icon"/> Pay
					</button>
				</div>
			</div> ;
		}
		else
		{
			isEmpty = <span>Your cart is empty!</span>;
		}
		return(
			<form onSubmit={() => this.sendData(this.props.onClickCloseModal)}>
			<div className="title-elements">
					<h1>Shipping cart</h1>
					<button 
					onClick={this.props.onClickCloseModal} 
					className="remove-button">Close</button>
			</div>

				<hr />

					{
						this.state.shippingCart.map(product => {
							return(
								<div className="product">
									<div>
										<input type="button"
										 onClick={() => {this.deleteProduct(product)}} 
										 className="remove-button" 
										 value = "x"/>
										<span className="product-name">{product.name}</span>
									</div>
									<div className="dots"></div>
									<span>$ {product.price}</span>
								</div>
								)
						})
					}
					{isEmpty}
					<hr />
					<h2 className="total">Total: $ {this.handlerTotal(this.props.shippingCart)}</h2>
				{payBtn}
			</form>
			)
	}

	async sendData(closeModal){
		closeModal();
			if(localStorage.getItem('user_balance') >= this.handlerTotal(this.props.shippingCart))
			{

					// this.toggleBlocking();
					let total = localStorage.getItem('user_balance') - this.handlerTotal(this.props.shippingCart);
					console.log(total);
					const requestOptions = {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							'mode': 'cors',
							'Authorization': 'bearer '+token.getToken()
						},
						body: JSON.stringify({ id: localStorage.getItem('user_id'), balance: total })
					};
					const res = await fetch(API.URL+'/users', requestOptions);
					var data = await res.json();
					if(res.status === 200)
					{
						console.log(data)
						this.props.changeBalance(total);
						alert('Thanks! Previous balance: $'+localStorage.getItem('user_balance')+' Total purchase cost: $'+Math.trunc(this.handlerTotal(this.props.shippingCart))+' Remaining balance: $'+Math.trunc(total));
						localStorage.setItem('user_balance',Math.trunc(total));
						// alert(data.message)
						// this.toggleBlocking();	
					}
					else
					{
						console.log(data)
						// alert(data.message);
						// token.deleteToken();
						// this.redirect();
					}
			}
			else
			{
				alert("You don't have enough money to buy these products");
			}
		}
	handlerTotal(products)
	{
		let aux = 0;
		products.map(data => {
			console.log(data)
			aux += data.price
		});
		if(aux === 0)
		{
			return 0;
		}
		else
		{
			return aux + this.state.shippingOptionTotal;
		}
	}
	changePickUpState()
	{
		this.setState({
			shippingOptionTotal: 0
		})
	}
	changeUsdState()
	{
		this.setState({
			shippingOptionTotal: 5
		})
	}

	deleteProduct(index){
		let data = this.props.shippingCart.indexOf(index);
		let array = this.props.shippingCart.splice(data,1);
		this.setState({
			shippingCart: this.props.shippingCart
		});
	}
}

export default ShippingCartModal;