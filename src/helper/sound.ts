import fail from '../assets/sound/fail.mp3';
import success from '../assets/sound/success.mp3';

export const sound = {
	success() {
		const audioDiv = document.querySelector('#audio') as HTMLAudioElement;
		audioDiv.removeAttribute('src');
		audioDiv.setAttribute('src', success);
		audioDiv.play();
	},
	fail() {
		const audioDiv = document.querySelector('#audio') as HTMLAudioElement;
		audioDiv.removeAttribute('src');
		audioDiv.setAttribute('src', fail);
		audioDiv.play();
	},
};
