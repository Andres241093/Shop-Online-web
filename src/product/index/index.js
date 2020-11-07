import React, { Component } from 'react';
import API from '../../config/env';
import token from '../../services/token';
import ProductCard from '../product-card/product-card';
import ShippingCartModal from '../shipping-cart-modal/shipping-cart-modal';
import './index.css';
import ShoppingCart from './shopping-cart.svg';
import Modal from 'react-modal';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

const customStyles = {
	content : {
		top                   : '50%',
		left                  : '50%',
		right                 : 'auto',
		bottom                : 'auto',
		marginRight           : '-50%',
		transform             : 'translate(-50%, -50%)',
		width				  : '50vw',
		height                :  '70vh'
	}
};

class Product extends Component 
{
	constructor()
	{
		super();
		this.state ={
				blocking: false,
				products: [],
				showModal: false,
				shippingCart: [],
				balance: localStorage.getItem('user_balance')
			}
		this.toggleBlocking = this.toggleBlocking.bind(this);
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
		this.pushShippingCart = this.pushShippingCart.bind(this);
		this.getBalance = this.getBalance.bind(this);
	}
	render()
	{
		Modal.setAppElement('#root');
		return(
			<div>
			<BlockUi tag="div" blocking={this.state.blocking}>
			<div className="title-elements">
			<div className="balance">
				<h1>Products</h1>
				<span>My balance: ${this.state.balance}</span>
			</div>
			<button onClick={this.handleOpenModal} className="btn-index">
				<img src={ShoppingCart} className="shopping-cart"/> ({this.state.shippingCart.length})
			</button>
			</div>
			<hr />
			<div className="products">
			{
				this.state.products.map(element => {
					return(
						<ProductCard 
						onSelectProduct={this.pushShippingCart}
						product={element}
						/>	
						)
				})
			}
			</div>
			<Modal 
			style={customStyles}
			isOpen={this.state.showModal}
			contentLabel="Minimal Modal Example"
			>
			<ShippingCartModal 
			shippingCart={this.state.shippingCart} 
			onClickCloseModal={this.handleCloseModal}
			changeBalance={this.getBalance}
			indexLoading={this.toggleBlocking}/>
			</Modal>
			</BlockUi>
			</div>
			);
	}
	async componentDidMount()
	{
		this.toggleBlocking();
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'mode': 'cors',
				'Authorization': 'bearer '+token.getToken()
			} 
		};
		const res = await fetch(API.URL+'/products', requestOptions);
		var data = await res.json();
		if(res.status === 200)
		{
			this.toggleBlocking();	
			this.setState(
			{ 
				products: data.products 
			}
			);
		}
		else
		{
			alert(data.message);
			token.deleteData();
			this.redirect();
		}
	}
	toggleBlocking(){
   	 this.setState({blocking: !this.state.blocking});
  	}
	pushShippingCart(product)
	{
		
	  	this.setState(
	    	state => { 
	    		const shippingCart = state.shippingCart.concat(product);

	    		return {
		        shippingCart
		      };
	    	}
	    );
		
  	//return this.state.shippingCart;
}
getBalance(user_balance)
{
	this.setState({
		balance: user_balance
	});
}
redirect()
{
	this.props.history.push('/login');
}
handleOpenModal () 
{
	this.setState(
	{ 
		showModal: true 
	}
	);
}

handleCloseModal () 
{
	this.setState(
	{ 
		showModal: false 
	}
	);
}
}

export default Product;