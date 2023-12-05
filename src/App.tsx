import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import Card from './components/Card/Card';
import ModalCustom from './components/Modal/Modal';
import { data } from './helper/data';
import { shuffle } from './helper/shuffle';
import { useNameStore, useRetryStore, useScoreStore } from './zustand/store';
import { ArrayData } from './types/Modal';

function App() {
	const { name } = useNameStore();
	const { retry, updateRetry } = useRetryStore();
	const { score, updateScore } = useScoreStore();
	const [openedCards, setOpenedCards] = useState<HTMLDivElement[]>([]);
	const [dataCard, setDataCard] = useState<ArrayData[]>([]);

	useEffect(() => {
		const shuffledData = shuffle(data);
		setDataCard(shuffledData);
	}, []);

	useEffect(() => {
		if (openedCards.length === 2) {
			updateRetry(retry);
			const [firstCard, secondCard] = openedCards;
			if (firstCard.dataset.id === secondCard.dataset.id) {
				setOpenedCards([]);
				updateScore(score);
			} else {
				setTimeout(() => {
					firstCard.classList.remove('flip');
					secondCard.classList.remove('flip');
					setOpenedCards([]);
				}, 1000);
			}
		}
	}, [openedCards]);

	function resetGame() {
		// updateRetry(0);
		// updateScore(0);
		console.log('reset');
	}

	if (retry === 2) {
		setTimeout(() => {}, 100);
		resetGame();
	}

	function handleCardClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		const cardInner = e.currentTarget;
		if (openedCards.length === 1) {
			cardInner.classList.add('flip');
			setOpenedCards((prevOpenedCards) => [...prevOpenedCards, cardInner]);
		} else if (openedCards.length === 2) {
			e.preventDefault();
		} else {
			cardInner.classList.add('flip');
			setOpenedCards((prevOpenedCards) => [...prevOpenedCards, cardInner]);
		}
	}

	return (
		<div className="container">
			<ModalCustom
				type={'login'}
				message={'undefined'}
				button={'Play Game'}
				heading={'Enter your name'}
			/>
			<h3 className="text-center">Memory game</h3>
			<div className="row mt-5" id="header">
				<div className="col-lg-4">{name ? name : 'Username'}</div>
				<div className="col-lg-4 text-center">Score: {score}</div>
				<div className="col-lg-4 text-end">Retries: {retry}/ 15</div>
			</div>
			<div className="row  mt-5" id="game-container">
				{dataCard?.map((item, index) => {
					return (
						<Card
							key={index}
							image={item.image}
							dataID={item.id}
							onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
								handleCardClick(e)
							}
						></Card>
					);
				})}
			</div>
		</div>
	);
}

export default App;
