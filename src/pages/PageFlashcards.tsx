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

	return (
		<>
			<h2 className="text-xl mb-4">This is the flashcards page.</h2>
			<div className="">
				{flashcards.map((flashcard) => {
					return (
						<div className="bg-blue-300 p-2 rounded w-fit mb-4">
							<p className="font-bold">{flashcard.front}</p>
							<p className="italic">{flashcard.back}</p>
						</div>
					);
				})}
			</div>
		</>
	);
};
