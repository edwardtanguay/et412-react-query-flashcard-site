import { IFlashcard } from "../interfaces";
import { getFlashcards } from "../dataModel/flashcardModel";
import { useQuery } from "@tanstack/react-query";
import { wait } from "../tools";

export const PageFlashcards = () => {
	const flashcardsQuery = useQuery<IFlashcard[]>({
		queryKey: ["flashcards"],
		queryFn: () => wait(2000).then( () => getFlashcards()),
	});

	if (flashcardsQuery.isLoading) {
		return <p>Loading...</p>
	}

	return (
		<>
			{flashcardsQuery.data && (
				<>
					<h2 className="text-xl mb-4">
						This is the flashcards page.
					</h2>
					<div className="">
						{flashcardsQuery.data.map((flashcard) => {
							return (
								<div
									key={flashcard.id}
									className="bg-blue-300 p-2 rounded w-fit mb-4"
								>
									<p className="font-bold">
										{flashcard.front}
									</p>
									<p className="italic">{flashcard.back}</p>
								</div>
							);
						})}
					</div>
				</>
			)}
		</>
	);
};
