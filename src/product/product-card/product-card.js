import React, { Component, useState } from 'react';
import StarRating from './stars/stars';
import ShoppingCart from '../index/shopping-cart.svg';
import API from '../../config/env';
import token from '../../services/token';
import './product-card.css';
import water from './water.jpg';
import apple from './apple.jpg';
import cheese from './cheese.jpg';
import beer from './beer.jpg';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

class ProductCard extends Component 
{
	constructor(props)
	{
		super(props);
		this.state={
			starPoint: '',
			avgRating: 0,
			blocking: false
		}
		this.toggleBlocking = this.toggleBlocking.bind(this);
		this.getStarPoint = this.getStarPoint.bind(this);
		this.getAvgRating = this.getAvgRating.bind(this);
		this.setRanting = this.setRanting.bind(this);
	}

	render()
	{
		let image;
		if (this.props.product.name === 'apple') {
			image = <img src={apple} alt={apple} />;
		}
		if (this.props.product.name === 'cheese') {
			image = <img src={cheese} alt={cheese} />;
		}
		if (this.props.product.name === 'beer') {
			image = <img src={beer} alt={beer} />;
		}
		if (this.props.product.name === 'water') {
			image = <img src={water} alt={water} />;
		}
		return(
			<div>
			<BlockUi tag="div" blocking={this.state.blocking}>
				<div className="card">
					<div className="card-img">
						{image}
					</div>
					<div className="card-title">
						{this.props.product.name}
					</div>
					<div className="card-subtitle">
						$ {this.props.product.price}
					</div>
					<div className="card-action">
						<div >
							<span>{ this.calculateStarValue(this.props.product.star_1,this.props.product.star_2,this.props.product.star_3,this.props.product.star_4,this.props.product.star_5)} of 5</span>
							<StarRating 
							onStarPointChange={this.getStarPoint}
							starValue={this.calculateStarValue(this.props.product.star_1,this.props.product.star_2,this.props.product.star_3,this.props.product.star_4,this.props.product.star_5)}
							/>
						</div>
						
						<button onClick={() => this.sendData()} 
						className="btn-card">
							+ <img className="shopping-cart" src={ShoppingCart} />
						</button>
					</div>
				</div>
				</BlockUi>
			</div>
			);
		}
		sendData()
		{
			this.props.onSelectProduct(this.props.product);
		}
		 toggleBlocking() {
		    this.setState({blocking: !this.state.blocking});
		  }
		getStarPoint(points)
		{
			if(points != null){
				this.setState({
					starPoint: points
				});
				//send to server
				console.log(points)
				this.setState({
					flag: false
				});
				this.setRanting('star_'+points,this.props.product.id)
			}
		}
		async setRanting(starNum,productId)
		{
			if(localStorage.getItem('flag')) {
				this.toggleBlocking();
				const requestOptions = {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						'mode': 'cors',
						'Authorization': 'bearer '+token.getToken()
					},
					body: JSON.stringify({ star: starNum, id: productId })
				};
				const res = await fetch(API.URL+'/products', requestOptions);
				var data = await res.json();
				if(res.status === 200)
				{
					localStorage.removeItem('flag');
					alert(data.message)
					this.toggleBlocking();	
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
				alert('Ranking is only set once per session');
			}
		}
		getAvgRating()
		{
			this.setState({
				avgRating: this.calculateStarValue(this.props.product.star_1,this.props.product.star_2,this.props.product.star_3,this.props.product.star_4,this.props.product.star_5)
			});
		}
		calculateStarValue(a,b,c,d,e)
		{
			let avgRatingFormula;
			avgRatingFormula = (1*a+2*b+3*c+4*d+5*e)/(a+b+c+d+e+1);
			return Math.trunc(avgRatingFormula);
		}
	}

export default ProductCard;