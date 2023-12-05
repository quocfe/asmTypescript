import _ from 'lodash';
import { ArrayData } from '../types/Modal';

export function shuffle(data: ArrayData[]) {
	const shuffledArray = _.shuffle([...data, ...data]);

	return shuffledArray;
}
