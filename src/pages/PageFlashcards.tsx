import { IFlashcard, INewFlashcard } from "../interfaces";
import { addFlashcard, getFlashcards } from "../dataModel/flashcardModel";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { wait } from "../tools";

const queryClient = new QueryClient();

export const PageFlashcards = () => {
	const flashcardsQuery = useQuery<IFlashcard[]>({
		queryKey: ["flashcards"],
		queryFn: () => wait(2000).then(() => getFlashcards()),
	});

	const newFlashcardMutation = useMutation({
		mutationFn: async (newFlashcard: INewFlashcard) => {
			addFlashcard(newFlashcard);
		},
		onSuccess: async () => {
			// TODO: fix it so invalidateQueries actulaly invalidates the queries 
			await queryClient.invalidateQueries({
				queryKey: ["flashcards"],
				refetchType: 'active'
			});
		},
	});

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const data = Object.fromEntries(
			new FormData(event.target as HTMLFormElement)
		);

		const _newFlashcard: INewFlashcard = {
			front: String(data.front),
			back: String(data.back),
		};

		newFlashcardMutation.mutate(_newFlashcard);
		// queryClient.invalidateQueries({ queryKey: ["flashcards"] });
		form.reset();
	};

	if (flashcardsQuery.isLoading) {
		return <p>Loading...</p>;
	}

	// TODO: get this to work
	// if (flashcardsQuery.isError) {
	// 	return (
	// 		<p>
	// 			Sorry, we couldn't load the flashcards at this time. Please
	// 			check back later.
	// 		</p>
	// 	);
	// }

	return (
		<>
			{flashcardsQuery.data && (
				<>
					<h2 className="text-xl mb-4">
						This is the flashcards page.
					</h2>

					<form
						onSubmit={handleSubmit}
						className="mt border p-4 rounded w-80 mb-4 pb-0"
					>
						<div className="mb-4 flex gap-2 items-center">
							<label htmlFor="front" className="text-xl pb-1">
								Front:
							</label>
							<input name="front" id="front" type="text" />
						</div>
						<div className="mb-4 flex gap-2 items-center">
							<label htmlFor="back" className="text-xl pb-1">
								Back:
							</label>
							<input name="back" id="back" type="text" />
						</div>
						<button className="mb-4">Add new flashcard</button>
					</form>

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
