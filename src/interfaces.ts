export interface INewFlashcard {
	front: string;
	back: string;
}

export interface IFlashcard extends INewFlashcard {
	id: number;
}

export interface IBlogItem {
	id: number;
	when: string;
	title: string;
	body: string;
	editingStatus: "showing" | "editing";
}
