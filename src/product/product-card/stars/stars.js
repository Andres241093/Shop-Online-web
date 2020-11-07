import React, {useState} from 'react';
import { FaStar } from 'react-icons/fa';
import './stars.css';

function StarRating(props){
	const [rating, setRating] = useState(null);
	const [hover, setHover] = useState(null);


	return(
			<div className="star">
			{[...Array(5)].map((star,i) => {
				const ratingValue = i+1;
				return(
						<label>
						<input 
							type="radio"
							name="rating"
							className="disabled"
							value={ratingValue}
							onClick={() => setRating(ratingValue)}
						/>
						<FaStar 
						className="star" 
						color={ratingValue <= (hover || props.starValue) ? "yellow" : "gray"} 
						onMouseEnter={() => setHover(ratingValue)}
						onMouseLeave={() => setHover(null)}
						onClick={() => props.onStarPointChange(rating)}
						/>
						</label>
					);			
			})}
			</div>
		)
}

export default StarRating;