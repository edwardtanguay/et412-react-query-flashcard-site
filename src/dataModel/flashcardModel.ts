import axios from "axios";
import { IFlashcard, INewFlashcard } from "../interfaces";

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

export const addFlashcard = async (flashcard: INewFlashcard) => {
	return new Promise<string>((resolve, reject) => {
		(async () => {
			try {
				const headers = {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json",
				};

				const response = await axios.post(flashcardsUrl, flashcard, {
					headers,
				});

				if (response.status === 201) {
					resolve("ok");
				} else {
					reject("Error status " + response.status);
				}
			} catch (e) {
				reject("Unknown error.");
			}
		})();
	});
};
