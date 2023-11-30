import axios from "axios";
import { IFlashcard } from "../interfaces";

const flashcardsUrl = "http://localhost:3011/flashcards";

export const getFlashcards = async () => {
	return new Promise<IFlashcard[]>((resolve, reject) => {
		try {
			(async () => {
				const response = await axios.get(flashcardsUrl);
				resolve(response.data);
			})();
		} catch (e) {
			reject("Unknown error: " + JSON.stringify(e));
		}
	});
};
