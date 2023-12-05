import { create } from 'zustand';

interface NameStoreState {
	name: string;
	updateName: (value: string) => void;
}

interface ScoreStoreState {
	score: number;
	updateScore: (value: number) => void;
}

interface RetryStoreState {
	retry: number;
	updateRetry: (value: number) => void;
}

const useNameStore = create<NameStoreState>((set) => ({
	name: '',
	updateName: (value) => set({ name: value }),
}));

const useScoreStore = create<ScoreStoreState>((set) => ({
	score: 0,
	updateScore: () => set((state) => ({ score: state.score + 1 })),
}));

const useRetryStore = create<RetryStoreState>((set) => ({
	retry: 0,
	updateRetry: () => set((state) => ({ retry: state.retry + 1 })),
}));

export { useNameStore, useScoreStore, useRetryStore };
