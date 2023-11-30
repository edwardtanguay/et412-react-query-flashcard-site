import { useEffect, useState } from "react";
import { IFlashcard } from "../interfaces";
import axios from "axios";

const flashcardsUrl = "http://localhost:3011/flashcards";

export const PageFlashcards = () => {
	const [flashcards, setFlashcards] = useState<IFlashcard[]>([]);

	const loadFlashcards = async () => {
		const response = await axios.get(flashcardsUrl);
		setFlashcards(response.data);
	};

	useEffect(() => {
		loadFlashcards();
	}, []);

	return <p>There are {flashcards.length} flashcards.</p>;
};
