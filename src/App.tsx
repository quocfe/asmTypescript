import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import Card from './components/Card/Card';
import ModalCustom from './components/Modal/Modal';
import { data } from './helper/data';
import { shuffle } from './helper/shuffle';
import { useNameStore, useRetryStore, useScoreStore } from './zustand/store';
import { ArrayData } from './types/Modal';
import { sound } from './helper/sound';

function App() {
	const { name } = useNameStore();
	const { retry, updateRetry } = useRetryStore();
	const { score, updateScore } = useScoreStore();
	const [win, setWin] = useState(false);
	const [lose, setLose] = useState(false);
	const [openedCards, setOpenedCards] = useState<HTMLDivElement[]>([]);
	const [dataCard, setDataCard] = useState<ArrayData[]>([]);

	useEffect(() => {
		if (score === data.length) {
			setWin(true);
			setLose(false);
		} else {
			setWin(false);
			setLose(true);
		}
	}, [score]);

	useEffect(() => {
		if (win && retry <= 15) {
			sound.successEnd();
		} else if (lose && retry === 15) {
			sound.failEnd();
		}
	}, [win, lose, retry]);

	useEffect(() => {
		const shuffledData = shuffle(data);
		setDataCard(shuffledData);
	}, []);

	useEffect(() => {
		if (openedCards.length === 1) {
			const [firstCard] = openedCards;
			firstCard.classList.add('check');
		} else if (openedCards.length === 2) {
			const [firstCard, secondCard] = openedCards;
			firstCard.classList.remove('check');
			updateRetry(retry);
			if (firstCard.dataset.id === secondCard.dataset.id) {
				setOpenedCards([]);
				updateScore(score);
				sound.success();
			} else {
				sound.fail();
				setTimeout(() => {
					firstCard.classList.remove('flip');
					secondCard.classList.remove('flip');
					setOpenedCards([]);
				}, 1000);
			}
		}
	}, [openedCards]);

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

	function checkModel(): JSX.Element | null {
		if (retry === 15 && win) {
			return (
				<ModalCustom
					type={'win'}
					message={':)))'}
					button={'Play again'}
					heading={'You win'}
					error={true}
				/>
			);
		} else if (win) {
			return (
				<ModalCustom
					type={'win'}
					message={':)))'}
					button={'Play again'}
					heading={'You win'}
					error={true}
				/>
			);
		} else if (retry === 15 && lose) {
			return (
				<ModalCustom
					type={'lose'}
					message={':((('}
					button={'Play again'}
					heading={'You lose'}
					error={true}
				/>
			);
		} else {
			return (
				<ModalCustom
					type={'login'}
					message={'Bạn có 15 lần chọn, chọn cho đúng nhé :))'}
					button={'Chơi chơi'}
					heading={'Bạn tên gì á??'}
					error={false}
				/>
			);
		}
	}

	return (
		<div className="container">
			{checkModel()}

			<audio controls id="audio" className="d-none"></audio>
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
