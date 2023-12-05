import React from 'react';
import './Card.css';

interface CardProps {
	image: string;
	dataID: number;
	onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Card: React.FC<CardProps> = ({ image, dataID, onClick }) => {
	function flipCard(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		onClick(e);
	}

	return (
		<div className="col-md-3 memory-card">
			<div className="card-inner" data-id={dataID} onClick={(e) => flipCard(e)}>
				<div className="card-face card-front"></div>
				<div className="card-face card-back">
					<img src={image} alt="" />
				</div>
			</div>
		</div>
	);
};

export default Card;
