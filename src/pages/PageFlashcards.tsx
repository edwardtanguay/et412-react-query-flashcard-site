import { useEffect, useState } from "react";
import { IFlashcard } from "../interfaces";
import axios from "axios";

const flashcardsUrl = 'http://localhost:3011/flashcards';

export const PageFlashcards = () => {
	const [flashcards, setFlashcards] = useState<IFlashcard[]>([]);

	const loadFlashcards = async () => {
		const response = await axios.get(flashcardsUrl);
		setFlashcards(response.data);
	}

	useEffect(() => {
		loadFlashcards();
	}, [])

	return (
		<>
		<h2 className="text-xl">This is the flashcards page.</h2>
			<div>
				{flashcards.map(flashcard => {
					return (
						<p>{flashcard.front}</p>
					)
				})}
		</div>
		</>
	)
}
