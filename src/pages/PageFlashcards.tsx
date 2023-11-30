import { useEffect, useState } from "react";
import { IFlashcard } from "../interfaces";
import { getFlashcards } from "../dataModel/flashcardModel";

export const PageFlashcards = () => {
	const [flashcards, setFlashcards] = useState<IFlashcard[]>([]);

	useEffect(() => {
		(async () => {
			const _flashcards = await getFlashcards();
			setFlashcards(_flashcards);
		})();
	}, []);

	return (
		<>
			<h2 className="text-xl mb-4">This is the flashcards page.</h2>
			<div className="">
				{flashcards.map((flashcard) => {
					return (
						<div key={flashcard.id} className="bg-blue-300 p-2 rounded w-fit mb-4">
							<p className="font-bold">{flashcard.front}</p>
							<p className="italic">{flashcard.back}</p>
						</div>
					);
				})}
			</div>
		</>
	);
};
